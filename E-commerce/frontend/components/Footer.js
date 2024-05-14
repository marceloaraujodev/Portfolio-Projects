import styled from 'styled-components';
import Center from './Center';
import Button from './Button';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Bg = styled.div`
  background-color: #222;
  color: white;
  /* padding: 50px 0; */

  margin-top: auto;
  margin-bottom: 0;
`;

export default function Footer() {
  return (
    <>
      <Bg>
        <Center>
          <footer>
            <div className="container">
              <footer className="pt-5 pb-4">
                <div className="row pb-4">
                  <div className="col-6 col-md-2 mb-3">
                    <h5>Section</h5>
                    <ul className="nav flex-column">
                      <li className="nav-item mb-2">
                        <a href="#" className="nav-link p-0 text-white">
                          Home
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a href="#" className="nav-link p-0 text-white">
                          Features
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a href="#" className="nav-link p-0 text-white">
                          Pricing
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a href="#" className="nav-link p-0 text-white">
                          FAQs
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a href="#" className="nav-link p-0 text-white">
                          About
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="col-6 col-md-2 mb-3">
                    <h5>Section</h5>
                    <ul className="nav flex-column">
                      <li className="nav-item mb-2">
                        <a href="#" className="nav-link p-0 text-white">
                          Home
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a href="#" className="nav-link p-0 text-white">
                          Features
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a href="#" className="nav-link p-0 text-white">
                          Pricing
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a href="#" className="nav-link p-0 text-white">
                          FAQs
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a href="#" className="nav-link p-0 text-white">
                          About
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="col-6 col-md-2 mb-3">
                    <h5>Section</h5>
                    <ul className="nav flex-column">
                      <li className="nav-item mb-2">
                        <a href="#" className="nav-link p-0 text-white">
                          Home
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a href="#" className="nav-link p-0 text-white">
                          Features
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a href="#" className="nav-link p-0 text-white">
                          Pricing
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a href="#" className="nav-link p-0 text-white">
                          FAQs
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a href="#" className="nav-link p-0 text-white">
                          About
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="col-md-5 offset-md-1 mb-3">
                    <form>
                      <h5>Subscribe to our newsletter</h5>
                      <p>Monthly digest of what's new and exciting from us.</p>
                      <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                        <label
                          htmlFor="newsletter1"
                          className="visually-hidden"
                        >
                          Email address
                        </label>
                        <input
                          id="newsletter1"
                          type="text"
                          className="form-control"
                          placeholder="Email address"
                        />
                        <Button $outline $white type="button">
                          Subscribe
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="d-flex flex-column flex-sm-row justify-content-between py-2 border-top">
                  <p>© 2024 Company, Inc. All rights reserved.</p>
                  <ul className="list-unstyled d-flex">
                    <li className="ms-3">
                      <a className="link-body-emphasis" href="#">
                        <svg className="bi" width="24" height="24">
                          <use xlinkHref="#twitter"></use>
                        </svg>
                      </a>
                    </li>
                    <li className="ms-3">
                      <a className="link-body-emphasis" href="#">
                        <svg className="bi" width="24" height="24">
                          <use xlinkHref="#instagram"></use>
                        </svg>
                      </a>
                    </li>
                    <li className="ms-3">
                      <a className="link-body-emphasis" href="#">
                        <svg className="bi" width="24" height="24">
                          <use xlinkHref="#facebook"></use>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </footer>
            </div>
          </footer>
        </Center>
      </Bg>
    </>
  );
}
