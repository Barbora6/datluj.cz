import Stage from "./components/Stage";
import { Item } from "./Item";

const App: React.FC = () => {
  return (
    <div className="container">
      <Item />
      <Stage />
    </div>
  );
};

export default App;
