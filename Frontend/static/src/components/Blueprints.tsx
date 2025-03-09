import React, { useState } from "react";

const Blueprints = () => {
  const [author, setAuthor] = useState<string>("");
  const [blueprints, setBlueprints] = useState<any[]>([]);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener los blueprints de un autor
  const handleGetBlueprints = async () => {
    console.log(`Buscando planos de: ${author}`);
    try {
      const response = await fetch(
        `http://localhost:8080/blueprints/${author}`
      );
      if (!response.ok) {
        throw new Error(`Error al obtener planos: ${response.statusText}`);
      }
      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("La respuesta del servidor no es válida.");
      }

      setBlueprints(data);

      const total = data.reduce(
        (sum: number, blueprint: any) => sum + (blueprint.points?.length || 0),
        0
      );
      setTotalPoints(total);

      setError(null); // Limpiar errores previos
    } catch (err: any) {
      console.error("Error obteniendo blueprints:", err);

      setError(err.message);
      setBlueprints([]);
      setTotalPoints(0);
    }
  };

  return (
    <div>
      <h1>Gestión de Blueprints</h1>

      {/* Campo para capturar el autor */}
      <input
        type="text"
        placeholder="Ingrese el nombre del autor"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <button onClick={handleGetBlueprints}>Get Blueprints</button>

      {/* Mostrar error si existe */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Mostrar nombre del autor seleccionado */}
      {blueprints.length > 0 && (
        <>
          <h2>Autor: {author}</h2>

          <table border={1}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Puntos</th>
              </tr>
            </thead>
            <tbody>
              {blueprints.map((bp) => (
                <tr key={bp.name}>
                  <td>{bp.name}</td>
                  <td>{bp.points.length}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Total de puntos: {totalPoints}</h3>
        </>
      )}
    </div>
  );
};

export default Blueprints;
