import bcrypt from "bcryptjs";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/services/db/getCurrentUser";

export async function POST(req) {
  console.log("got to post endpont");
  try {
    const body = await req.json();

    const {
      email,
      password,
      name,
      confirmPassword,
      role = "CLIENT",
      artisticName,
    } = body;

    console.log({ body });

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Datos incorrectos, prueba de nuevo" },
        { status: 400 },
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Las contraseñas no coinciden" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
        confirmPassword: "", //TODO: not sure if we should store this
        role,
      },
    });

    // create the settings for the user

    await prisma.settings.create({
      data: {
        user: { connect: { id: user.id } },
      },
    });

    if (role === "ARTIST") {
      // Search if the artist profile with that name already exist
      const artistProfile = await prisma.artistProfile.findFirst({
        where: {
          artisticName,
        },
      });

      if (artistProfile?.userId)
        return NextResponse.json(
          { error: "El nombre artístico ya está en uso" },
          { status: 400 },
        );

      // if it exist, connect the artist profile to the user, else create the artist profile with that artisticName
      if (artistProfile) {
        await prisma.artistProfile.update({
          where: {
            artisticName,
          },
          data: {
            user: { connect: { id: user.id } },
          },
        });
      } else {
        await prisma.artistProfile.create({
          data: {
            user: { connect: { id: user.id } },
            artisticName,
          },
        });
      }
    }

    console.log("USER!!!!", { user });
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.log(error, "REGISTRATION_ERROR");
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function PUT(req) {
  const currentUser = await getCurrentUser(req);

  if (!currentUser) {
    return NextResponse.redirect("/login");
  }

  try {
    const body = await req.json();

    const {
      email,
      password,
      name,
      confirmPassword,
      role = "CLIENT",
      darkMode,
    } = body;

    let data = {};

    console.log({ darkMode });

    // if (theme !== undefined) {
    //     data.darkMode = theme;
    // }

    // if (password !== confirmPassword) {
    //     return NextResponse.json({ error: 'Las contraseñas no coinciden' }, { status: 400 })
    // }

    // update the current user settings with the new value of theme
    const settings = await prisma.settings.update({
      where: {
        userId: currentUser.id,
      },
      data,
    });

    return NextResponse.json({ settings }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
