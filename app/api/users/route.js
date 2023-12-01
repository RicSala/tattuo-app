import { getCurrentUser } from "@/services/db/getCurrentUser";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prismadb";
import { UserService } from "@/services/db/UserService";

export async function PUT(request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const body = await request.json();

  const { data } = body;

  const { name, currentPassword, newPassword, confirmNewPassword, darkMode } =
    data;

  let updatedData = {};

  if (newPassword) {
    const isCorrectPassword = await bcrypt.compare(
      currentPassword,
      currentUser.hashedPassword,
    );

    const passwordsMatch = newPassword === confirmNewPassword;

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

  // Update the user in the database
  await UserService.settingsUpdate(currentUser.id, updatedData);

  return NextResponse.json(
    {
      message: "Usuario actualizado correctamente",
    },
    { status: 200 },
  );
}
