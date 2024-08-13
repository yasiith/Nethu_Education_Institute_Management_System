import "@styles/globals.css";

export const metadata = {
  title: "NEIMS",
  description: "Learn at Ease"
};

const Rootlayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div>
          <div className="gradient" />
        </div>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default Rootlayout;
