import './App.css';

function App() {
  // create the whole structure of the app

  return (
    <>
      <div className="main-container">
        <main>
          <nav>
            <a className="logo">LinkLogoOnLeft</a>

            <ul>
              <li>link 1</li>
              <li>link 2</li>
              <li>link 3</li>
            </ul>

            <div>on the right</div>
          </nav>

          {/* section one */}

                  
        <div className='section1Container'>
          <div className='section1-left'>Are you an Architect, a Designer or a Developer ? FormaStudio is here for you, specializing in creating emotional illustrations that uniquely represent your project.</div>
          <div className='section1-right'>BRINGING IDEAS
TO LIFE</div>
        </div>

          {/* other section */}

          {/* <div>
          <div>text block 1</div>
          <div>big text block 2</div>
        </div>
        <div>
          <div>Meet Team</div>
          <div>team fotos</div>
        </div> */}

          {/* footer */}
          {/* 
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
        </footer> */}
        </main>
      </div>
    </>
  );
}

export default App;
