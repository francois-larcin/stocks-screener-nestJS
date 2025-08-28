import { Button } from "../components";
import { useNavigate } from "react-router";
import { ImagePerso } from "../components/Image";
import wallPaper from "../assets/images/wallPaper.png";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <ImagePerso
        src={wallPaper}
        alt="Fond d'écran"
        opacity={0.5}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      <div className="z-10 bg-black/60 backdrop-blur-sm rounded-xl px-8 py-10 text-center space-y-6 shadow-xl">
        <h1 className="text-5xl font-extrabold text-white tracking-wide font-title">
          Bienvenue sur ScreenerJs
        </h1>

        <Button
          label="Se connecter"
          color="blue"
          onClick={() => navigate("/login")}
        />
        <Button
          label="Pas encore de compte ?"
          color="yellow"
          onClick={() => navigate("/register")}
        />
      </div>
    </div>
  );
}
