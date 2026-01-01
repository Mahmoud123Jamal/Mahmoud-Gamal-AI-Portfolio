function Footer() {
  return (
    <>
      <footer className="bg-blue-600 text-white p-6 text-center shadow-2xl mt-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} My Portfolio. All rights reserved.
        </p>

        <p className="text-xs mt-1 opacity-75">
          Developed and Maintained by **ENG/Mahmoud Jamal**
        </p>
      </footer>
    </>
  );
}

export default Footer;
