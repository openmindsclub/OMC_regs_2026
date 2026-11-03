import DepartmentSelectionDesktop from "./DepartmentSelectionDesktop";
import DepartmentSelectionMobile from "./DepartmentSelectionMobile";

export default function DepartmentSelection() {
  return (
    <>
      {/* Affiché uniquement sur grand écran (Desktop) */}
      <div className="hidden lg:block">
        <DepartmentSelectionDesktop />
      </div>

      {/* Affiché uniquement sur mobile / tablette */}
      <div className="block lg:hidden">
        <DepartmentSelectionMobile />
      </div>
    </>
  );
}