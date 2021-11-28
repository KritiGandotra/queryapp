import { getProviders, signIn as SignIntoProvider } from "next-auth/react";
import Header from "../../components/Header";
import axios from "axios";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Scroll from "../../components/scroll";
import { Navbar } from "react-bootstrap";
import { Nav, NavDropdown } from "react-bootstrap";
import { db } from "../../firebase";
import { collection, addDoc } from "@firebase/firestore";
import {
  BookOpenIcon,
  QuestionMarkCircleIcon,
  AnnotationIcon,
  HeartIcon,
  SearchIcon,
  LoginIcon,
  ReplyIcon,
  MicrophoneIcon,
  ChatAlt2Icon,
  UserIcon,
  PhotographIcon,
  BellIcon,
  PhoneIcon,
  MailIcon,
  BriefcaseIcon,
} from "@heroicons/react/outline";

function signIn({ providers }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  const [apiKey, setApiKey] = useState(
    "AIzaSyCKT0iaQWCsUcprlyvoonCa-F0Clx2hzAY"
  );
  const [number, setNumber] = useState();
  function handleChange(event) {
    const book = event.target.value;

    setBook(book);
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          book +
          "&key=" +
          apiKey +
          "&maxResults=" +
          number
      )

      .then((data) => {
        setResult(data.data.items);
      });
  }

  const handleSubmit1 = (e) => {
    e.preventDefault();

    addDoc(collection(db, "contacts"), {
      name: name,
      email: email,
      message: message,
    })
      .then(() => {
        alert("Your message has been recorded!");
      })
      .catch((error) => {
        alert(error.message);
      });

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <Navbar
        sticky="top"
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className="shadow-sm"
      >
        <Container>
          <Navbar.Brand href="#">QUERY</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              {/*<Nav.Link href="#pricing">Pricing</Nav.Link>*/}
              <NavDropdown title="Features" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#currentfeatures">
                  Current
                </NavDropdown.Item>
                <NavDropdown.Item href="#upcomingfeatures">
                  Upcoming
                </NavDropdown.Item>
                {/* <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
  </NavDropdown.Item>*/}
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#contactus">Contact Us</Nav.Link>

              <Nav.Link eventKey={2} href="#booksearch">
                Book Search
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/*<Header />*/}
      <Scroll showBelow={250} />
      <div id="home" className="grid md:grid-cols-2 mt-10">
        <div>
          <div className="bgColour flex flex-col items-center justify-center min-h-screen -mt-20 py-2 px-14 text-center">
            <img
              className="w-80"
              src="https://www.linkpicture.com/q/QUERY-1.png"
            />
            <div className="colorText  fontFam text-center mt-10">
              Query is a knowledge-sharing community where students and experts
              put their heads together to crack their questions.
            </div>
            <div className="mt-14">
              {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <button
                    className="googleButton"
                    onClick={() =>
                      SignIntoProvider(provider.id, { callbackUrl: "/" })
                    }
                  >
                    Sign in with {provider.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bgColour flex flex-col  items-center justify-center -mt-20 min-h-screen py-2 px-14 text-center ">
          <img
            className="w-150 pt-20"
            src="https://www.linkpicture.com/q/Brazuca-Planning.png"
          />
        </div>
      </div>
      <Container id="booksearch" className=" mt-0">
        <div className="container mt-10 ">
          <h1>Book Search</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                onChange={handleChange}
                className="form-control mt-6"
                placeholder="Search for books"
                autoComplete="off"
              />
            </div>
            <Row className="mt-2">
              <Col sm={3}>
                <input
                  className="form-control"
                  type="number"
                  placeholder="Number Of Books"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </Col>
            </Row>

            <button type="submit" className="btn btn-danger mt-6">
              Search
            </button>
          </form>

          {result.map((book) => (
            <div className="mt-10 booksDiv">
              <a target="_blank" href={book.volumeInfo.previewLink}>
                <img
                  className="books"
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt="{book.title}"
                />
              </a>
            </div>
          ))}
        </div>
      </Container>

      <Container id="currentfeatures" className="pt-40">
        <Row>
          <div className="d-flex justify-content-center W-80 pb-16">
            <img
              className="w-80"
              src="https://www.linkpicture.com/q/WhatsApp-Image-2021-11-24-at-03.43.33.jpeg"
            />
          </div>
        </Row>
        <Row>
          <Col sm={4}>
            <Row className="mb-10">
              <Col>
                <div className="features p-3 bgC1 rounded-full">
                  <BookOpenIcon className="h-14 text-white" />
                </div>
                <div className="f">
                  <h5 className="pl-28 font-semibold titleColor">
                    Book Search
                  </h5>
                  <p className="pl-28">
                    Enter a topic and get multiple book suggestions to choose
                    from.
                  </p>
                </div>
              </Col>
            </Row>

            <Row className="mb-10">
              <Col>
                <div className="features p-3 bgC2 rounded-full">
                  <QuestionMarkCircleIcon className="h-14 text-white" />
                </div>
                <div className="f">
                  <h5 className="pl-28 font-semibold titleColor">
                    Ask Questions
                  </h5>
                  <p className="pl-28">
                    Upload your questions in form of pictures with revevant
                    captions.
                  </p>
                </div>
              </Col>
            </Row>
          </Col>

          <Col sm={4}>
            <Row className="mb-10">
              <Col>
                <div className="features p-3 bgC3 rounded-full">
                  <AnnotationIcon className="h-14 text-white" />
                </div>
                <div className="f">
                  <h5 className="pl-28 font-semibold titleColor">
                    Answer Questions
                  </h5>
                  <p className="pl-28">
                    Answer questions asked by others on the platform by replying
                    under posts.
                  </p>
                </div>
              </Col>
            </Row>
            <Row className="mb-16">
              <Col>
                <div className="features p-3 bgC4 rounded-full">
                  <HeartIcon className="h-14 text-white" />
                </div>
                <div className="f">
                  <h5 className="pl-28 font-semibold titleColor">
                    Like Questions
                  </h5>
                  <p className="pl-28">
                    Motivate and support your peers by liking questions that
                    help you.
                  </p>
                </div>
              </Col>
            </Row>
            <Row className="mb-10">
              <Col>
                <div className="features p-3 bgC1 rounded-full">
                  <SearchIcon className="h-14 text-white" />
                </div>
                <div className="f">
                  <h5 className="pl-28 font-semibold titleColor">
                    Keyword Search
                  </h5>
                  <p className="pl-28">
                    Get relevant results on the online forum by entering
                    keywords.
                  </p>
                </div>
              </Col>
            </Row>
          </Col>

          <Col sm={4}>
            <Row className="mb-10">
              <Col>
                <div className="features p-3 bgC2 rounded-full">
                  <ReplyIcon className="h-14 text-white" />
                </div>
                <div className="f">
                  <h5 className="pl-28 font-semibold titleColor">
                    Active Customer Feedback
                  </h5>
                  <p className="pl-28">
                    Get immediate feedback from customers with Feeback forms,
                    supporting the concept of Agile.
                  </p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="features p-3 bgC3 rounded-full">
                  <LoginIcon className="h-14 text-white" />
                </div>
                <div className="f">
                  <h5 className="pl-28 font-semibold titleColor">
                    Google Authentication
                  </h5>
                  <p className="pl-28">
                    Sign in with your google account and start solving queries
                    just in one click.
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <Container id="upcomingfeatures" className="pt-16">
        <Row>
          <div className="d-flex justify-content-center w-150 pb-12">
            <img
              className="w-150"
              src="https://www.linkpicture.com/q/Fashion-Boutique-1-1.png"
            />
          </div>
        </Row>
        <Row>
          <Col sm={6} className="d-flex justify-content-center">
            <img src="https://www.linkpicture.com/q/Hands-Calendar.png" />
          </Col>

          <Col sm={6}>
            <Row>
              <Col>
                <div className="features p-3 textC1">
                  <MicrophoneIcon className="h-12 " />
                </div>
                <div className="f">
                  <h5 className="pl-28 font-semibold titleColor mt-3.5 ">
                    Audio Search
                  </h5>
                  <p className="pl-28">Search via a voice command.</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="features p-3 textC2">
                  <PhotographIcon className="h-12 " />
                </div>
                <div className="f">
                  <h5 className="pl-28 font-semibold titleColor mt-3.5">
                    Image Search
                  </h5>
                  <p className="pl-28">Search questions via images.</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="features p-3 textC3">
                  <ChatAlt2Icon className="h-12 " />
                </div>
                <div className="f">
                  <h5 className="pl-28 font-semibold titleColor mt-3.5 ">
                    One-to-one chat
                  </h5>
                  <p className="pl-28">
                    Connent with your peers via end-to-end personalized chat.
                  </p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="features p-3  textC4">
                  <UserIcon className="h-12" />
                </div>
                <div className="f">
                  <h5 className="pl-28 font-semibold titleColor mt-3.5 ">
                    Personalized Profile Tab
                  </h5>
                  <p className="pl-28">
                    A personalized tab where users can maintain the posts they
                    have made previously and to see their saved posts.
                  </p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="features p-3  textC3">
                  <BellIcon className="h-12" />
                </div>
                <div className="f">
                  <h5 className="pl-28 font-semibold titleColor mt-3.5 ">
                    Notifications Tab
                  </h5>
                  <p className="pl-28">
                    A tab to maintain noifications to get notified everytime
                    another user answers your post.
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <Container className="mt-40 mb-1">
        <Row className="contact mb-10">
          <h1>Contact Us</h1>
        </Row>
        <Row>
          <Col sm={4} className="">
            <Row>
              <Col className="d-flex justify-content-center">
                <div className="features p-3 bgC3 rounded-full">
                  <LoginIcon className="h-8 text-white" />
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="mt-3 d-flex justify-content-center titleC">
                <div>Email:</div>
              </Col>
            </Row>
            <Row>
              <Col className="mt-2 mb-5 d-flex justify-content-center textC">
                <div>kritigandotra@gmail.com</div>
              </Col>
            </Row>
          </Col>
          <Col sm={4}>
            <Row>
              <Col className="d-flex justify-content-center">
                <div className="features p-3 bgC1 rounded-full">
                  <PhoneIcon className="h-8 text-white" />
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="mt-3 d-flex justify-content-center titleC">
                <div>Phone:</div>
              </Col>
            </Row>
            <Row>
              <Col className="mt-2 mb-5 d-flex justify-content-center textC">
                <div>9068560881</div>
              </Col>
            </Row>
          </Col>
          <Col sm={4}>
            <Row>
              <Col className="d-flex justify-content-center">
                <div className="features p-3 bgC2 rounded-full">
                  <BriefcaseIcon className="h-8 text-white" />
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="mt-3 d-flex justify-content-center titleC">
                <div>LinkedIn:</div>
              </Col>
            </Row>
            <Row>
              <Col className="mt-2 d-flex justify-content-center textC">
                <div>Kriti Gandotra</div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <Container id="contactus" className="contactF">
        <Row>
          <Col sm={3}></Col>
          <Col sm={6}>
            <form onSubmit={handleSubmit1}>
              <div className="form-group mt-8">
                <input
                  type="text"
                  className="form-control pt-2 pb-2"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group mt-3">
                <input
                  type="email"
                  className="form-control pt-2 pb-2"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group mt-3">
                <textarea
                  class="form-control "
                  placeholder="Message"
                  rows="3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary mt-6 mb-6">
                Submit
              </button>
            </form>
          </Col>
          <Col sm={3}></Col>
        </Row>
      </Container>
      <Container>
        <hr />
        <Row>
          <Col sm={6}>
            <div className="text-sm">
              Copyright © 2021 Query. All rights reserved.
            </div>
          </Col>
          <Col sm={2}> </Col>

          <Col sm={1}>
            <Nav.Link className="text-sm" href="#home">
              Home
            </Nav.Link>
          </Col>
          <Col sm={1}>
            <Nav.Link className="text-sm" href="#currentfeatures">
              Features
            </Nav.Link>
          </Col>
          <Col sm={1}>
            <Nav.Link className="text-sm" href="#contactus">
              Contact
            </Nav.Link>
          </Col>
          <Col sm={1}>
            <Nav.Link className="text-sm" href="#booksearch">
              Search
            </Nav.Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}

export default signIn;
