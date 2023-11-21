import bcrypt from "bcryptjs";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/services/db/getCurrentUser";
import { UserService } from "@/services/db/UserService";
import { ArtistService } from "@/services/db/ArtistService";

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

    // TODO: this (creating the user and later connecting the artist) is gonna creat a problem if he's artist and later can claim his profile (because the user will already be taken!)
    const user = await UserService.register(name, email, hashedPassword, role);

    if (role === "CLIENT") return NextResponse.json({ user }, { status: 201 });
    if (role === "ADMIN") return NextResponse.json({ user }, { status: 201 });

    // Search if the artist profile with that name already exist
    const artistProfile = await ArtistService.getByArtisticName(artisticName);

    console.log("ARTIST PROFILE", artistProfile);

    if (artistProfile?.userId) {
      return NextResponse.json(
        { error: "El nombre artístico ya está en uso" },
        { status: 400 },
      );
    }

    // if it exist, connect the artist profile to the user, else create the artist profile with that artisticName
    if (!!artistProfile) {
      console.log("connected");
      ArtistService.connectWithUserId(artistProfile.id, user.id);
    } else {
      console.log("CREATED!!!!!");
      ArtistService.createWithUserId(artisticName, user.id);
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
    const settings = UserService.settingsUpdate(currentUser.id, data);

    return NextResponse.json({ settings }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
