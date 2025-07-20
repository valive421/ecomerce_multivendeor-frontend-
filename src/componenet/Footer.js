function Footer() {
  return (
    <footer className="mt-5 pt-4 pb-2 border-top text-center text-light bg-dark">
      <div className="container">
        <p className="mb-1">&copy; {new Date().getFullYear()} bit Bazzar. All rights reserved.</p>
        <small>Made with <span className="text-danger">&#10084;</span> for you.</small>
      </div>
    </footer>
  );
}

export default Footer;