import './App.css';

function App() {
  // create the whole structure of the app

  return (
    <>
      <main>
        <nav></nav>
        {/* section one */}
        <div>
          <div>text block 1</div>
          <div>big text block 2</div>
        </div>
        {/* other section */}
        <div>
          <div>text block 1</div>
          <div>big text block 2</div>
        </div>
        <div>
          <div>Meet Team</div>
          <div>team fotos</div>
        </div>
        {/* footer */}
        <footer>
          <div>
            with menus in the row separeted by block of other divs | | |
            <div>Text and a link on top of each other</div>
            <div>
              Site menu
              <div>sitemenu</div>
              <div>address</div>
              <div>Social Media</div>
            </div>
          </div>
          <div>
            second row just a straight row with content | and space between
            constent 2<div>content footer 1</div>
            <div>content footer 2</div>
          </div>
        </footer>
      </main>
    </>
  );
}

export default App;
