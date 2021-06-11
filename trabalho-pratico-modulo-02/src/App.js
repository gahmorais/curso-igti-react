import { useEffect } from "react";
import { backend } from "./backend/data";
import Investments from './components/Investments'
import Investment from './components/Investment'

export default function App() {
  useEffect(() => {
    document.title = "react-investments";
  }, []);

  console.log(backend);
  return (
    <div>
      <header>
        <div className=" mx-auto p-4 bg-green-300">
          <h1 className="text-center font-semibold text-xl">
            react-investments
          </h1>
        </div>
      </header>

      <main>
      <div>
        <Investments>
          {backend.map( investment => {
            return <Investment key={investment.id}>{investment}</Investment>
          } )}
        </Investments>
      </div>
      </main>
    </div>
  );
}
