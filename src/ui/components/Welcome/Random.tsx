import React, { useEffect, useState } from "react";
import { ImageContainer } from "./welcome.style";

export function Random() {
  const [componenteAtual, setComponenteAtual] = useState(null);

  useEffect(() => {
    const componentes = [
      import("./welcome1"),
      import("./welcome2"),
      import("./welcome3"),
      import("./welcome6"),
      import("./welcome7"),
      import("./welcome8"),
      import("./welcome9"),
      import("./welcome10"),
      import("./welcome11"),
    ];

    Promise.all(componentes)
      .then((componentesImportados) => {
        setComponenteAtual(componentesImportados[Math.floor(Math.random() * componentesImportados.length)].default);
      })
      .catch((error) => {
        console.error("Erro ao carregar os componentes:", error);
      });
  }, []);

  return <>{componenteAtual}</>;
}
