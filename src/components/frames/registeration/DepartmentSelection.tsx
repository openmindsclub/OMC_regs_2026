
import { useState } from "react";
import type { CSSProperties } from "react";
import "./DepartmentSelection.css";

interface Department {
  id: string;
  name: string;
  type: string;
  character: string;
  image: string;
  color: string;
}

const departments: Department[] = [
  {
    id: "multimedia",
    name: "MULTIMEDIA",
    type: "ENHANCER",
    character: "GON",
    image: "/images/departements/multimedia.png",
    color: "#00F66A",
  },
  {
    id: "it",
    name: "IT",
    type: "SPECIALIZATION",
    character: "CHROLLO",
    image: "/images/departements/it.png",
    color: "#C084FC99",
  },
  {
    id: "marketing",
    name: "MARKETING",
    type: "CONJURATION",
    character: "KURAPIKA",
    image: "/images/departements/marketing.png",
    color: "#F5425599",
  },
  {
    id: "design",
    name: "DESIGN",
    type: "TRANSMUTATION",
    character: "KILLUA",
    image: "/images/departements/design.png",
    color: "#2BA4D5",
  },
  {
    id: "b2b",
    name: "B2B",
    type: "MANIPULATION",
    character: "ILLUMI",
    image: "/images/departements/b2b.png",
    color: "#D8D8D899",
  },
];

export default function DepartmentSelection() {
  const [selected, setSelected] = useState<string | null>(null);


  const toggleDepartment = (id: string) => {
    setSelected((prev) => (prev === id ? null : id));
  };

  return (
    <div className="department-section">
      <header className="department-heading">
        <h1>Choose Your Path</h1>
        <p>Which department would you like to join?</p>
      </header>

      <div className="department-grid">
        {departments.map((department) => {
          const active = selected === department.id;

          return (
            <div
              key={department.id}
              className={`department-item ${active ? "active" : ""}`}
              style={
                {
                  "--card-color": department.color,
                } as CSSProperties
              }
            >
              <button
                type="button"
                className="department-card"
                onClick={() => toggleDepartment(department.id)}
                aria-pressed={active}
                aria-label={`Select ${department.name}`}
              >
                <img
                  src={department.image}
                  alt={`${department.character} - ${department.name}`}
                />
              </button>

              <button
                type="button"
                className={`department-checkbox ${active ? "checked" : ""}`}
                onClick={() => toggleDepartment(department.id)}
                aria-label={`Select ${department.name}`}
                aria-pressed={active}
              >
                {active ? "✓" : ""}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}