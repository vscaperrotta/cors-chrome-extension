function Footer({
  message = ''
}) {

  return (
    <footer className="footer__container">
      <p className="footer__message">
        {message}
      </p>
    </footer>
  )
}

export default Footer;