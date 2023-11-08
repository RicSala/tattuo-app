"use client";

import CoolLoginButton from "@/components/cool-login-button";
import EmptyState from "@/components/empty-states/empty-state";

export default function DeniedPage({}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <EmptyState
        title="No estás autorizado. Por favor, loguéate"
        subtitle="Desde tu cuenta podrás guardar tus artistas favoritos y contactar con ellos"
      />

      <CoolLoginButton />
    </div>
  );
}
