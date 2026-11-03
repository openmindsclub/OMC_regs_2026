import RegisterationFormDesktop from "./RegisterationFormDesktop";
import RegisterationFormMobile from "./RegisterationFormMobile";


export default function RegisterationForm() {
  return (
    <>
      {/* Affiché uniquement sur grand écran (Desktop) */}
      <div className="hidden lg:block">
        <RegisterationFormDesktop />
      </div>

      {/* Affiché uniquement sur mobile / tablette */}
      <div className="block lg:hidden">
        <RegisterationFormMobile />

      </div>
    </>
  );
}