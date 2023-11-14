import { getCurrentUser } from "@/services/db/getCurrentUser";
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

  console.log({ data });
  const { name, currentPassword, newPassword, confirmNewPassword, darkMode } =
    data;

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

  updatedData.darkMode = darkMode;

  console.log({ updatedData });

  // Update the user in the database
  const newUser = await prisma.settings.update({
    where: { userId: currentUser.id },
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
