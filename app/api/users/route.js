import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prismadb";

export async function PUT(request) {
  const currentUser = await getCurrentUser();

  console.log({ currentUser });

  if (!currentUser) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const body = await request.json();

  const { data } = body;
  const { name, currentPassword, newPassword, confirmNewPassword } = data;

  let updatedData = {};

  if (newPassword) {
    const isCorrectPassword = await bcrypt.compare(
      currentPassword,
      currentUser.hashedPassword,
    );

    console.log({ isCorrectPassword });

    const passwordsMatch = newPassword === confirmNewPassword;

    console.log({ passwordsMatch });

    if (!isCorrectPassword) {
      return NextResponse.json(
        { error: "La contraseña actual no es correcta" },
        { status: 400 },
      );
    }

    if (!passwordsMatch) {
      return NextResponse.json(
        { error: "Las contraseñas no coinciden" },
        { status: 400 },
      );
    }

    updatedData.hashedPassword = await bcrypt.hash(newPassword, 12);
  }

  if (name) {
    updatedData.name = name;
  }

  // Update the user in the database
  const newUser = await prisma.user.update({
    where: { id: currentUser.id },
    data: updatedData,
  });

  console.log(newUser.name);

  return NextResponse.json(
    {
      message: "Usuario actualizado correctamente",
    },
    { status: 200 },
  );
}
