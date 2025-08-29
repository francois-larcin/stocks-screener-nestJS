import { Button } from "../components";
import { useNavigate } from "react-router";
import { ImagePerso } from "../components/Image";
import wallPaper from "../../src/assets/images/wallPaper.png";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <ImagePerso
        src={wallPaper}
        alt="Fond d'écran"
        opacity={0.5}
        className="absolute top-0 left-0 w-full h-full object-cover z-0 transform scale-100"
      />

      <div className="z-10 bg-black/60 backdrop-blur-sm rounded-xl px-8 py-10 text-center space-y-6 shadow-xl">
        <h1 className="text-5xl font-extrabold text-white tracking-wide font-title">
          Praestora
        </h1>
        <p className="mt-4 text-lg text-white/80 font-light tracking-wide">
          Investir avec discernement, réussir avec justesse
        </p>

        <Button
          label="Se connecter"
          color="bull"
          onClick={() => navigate("/login")}
        />
        <Button
          label="Créer un compte"
          color="bear"
          onClick={() => navigate("/register")}
        />
      </div>
    </div>
  );
}
