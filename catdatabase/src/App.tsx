import Search from "./Search";
import "./App.css";
import diana from "./assets/diana.png";

function App() {
  return (
    <div className="flex-container" style={{ 
      minHeight: '100vh', 
      minWidth: '100vw',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <img
      src={diana}
      alt="background"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        objectFit: 'cover',
        zIndex: -2
      }}
      />
      <div className="underlay" style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}></div>
      <h1 className="title" style={{ position: 'relative', zIndex: 1 }}>Busqueda de Gatos</h1>
      <h2 className="subtitle" style={{ position: 'relative', zIndex: 1 }}>Encuentra tu gato en nuestra database!</h2>
      <div style={{ position: 'relative', zIndex: 1 }}>
      <Search />
      </div>
    </div>
  );
}

export default App;
