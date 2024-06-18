export default function Footer() {
    return (
      <div id="footer-wrapper">
        <section className="footer-columns">
          <span id="company">
            <ul className="footerlist">
              <b>Navart</b>
              <li><a href="/">About us</a></li>
              <li><a href="/">Terms</a></li>
              <li><a href="/">Privacy</a></li>
              <li><a href="/">Help</a></li>
            </ul>
          </span>
          <span id="workwithus">
            <ul className="footerlist">
              <b>Work with us</b>
              <li><a href="/">Artists</a></li>
              <li><a href="/">Institutions</a></li>
              <li><a href="/">API</a></li>
            </ul>
          </span>
          <span id="connect">
            <ul className="footerlist">
              <b>Connect</b>
              <li><a href="/">Twitter / X</a></li>
              <li><a href="/">Instagram</a></li>
              <li><a href="/">Facebook</a></li>
              <li><a href="/">Pinterest</a></li>
            </ul>
          </span>
        </section>
        <section className="footerlogo">
        <a href="/">
        <img
        src="https://i.ibb.co/1bM0rQy/Exhibition-logo-2.png"
        alt="logo"
        style={{ width: '150px', height: '150px' }}
        />
        </a>
        </section>
      </div>
    );
  }