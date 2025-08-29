import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { Button } from "../Button";
import { Input } from "../Input";

export default function Navbar() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  //* typer correctement l'event e avec FormEvent
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim()) {
      //* encode les caractères spéciaux pour qu'ils soient valides
      navigate(`/search?q=${encodeURIComponent(input)}`);
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-500" />
          <span className="font-semibold">StockScreener</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6 ml-4">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/favorites">Favoris</NavLink>
          <NavLink to="/backtest">Simulation</NavLink>
          <NavLink to="/dividends">Dividendes</NavLink>
        </nav>

        {/* Barre de recherche */}
        <form onSubmit={submit} className="ml-auto flex items-center gap-2">
          <Input
            type="credentials"
            value={input}
            onChange={setInput}
            placeholder="Search"
            className="w-[280px] shadow-inner"
          />
          <Button label="Go" size="sm" />
        </form>

        {/* Avatar placeholder */}
        <div className="ml-2 w-9 h-9 rounded-full bg-slate-200" />
      </div>
    </header>
  );
}
