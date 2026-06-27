import { useNavigate } from "react-router-dom";

function Splash() {
  const navigate = useNavigate();

  return (
    <div className="screen">
      <div className="splash-card">

        <div className="logo-section">
          <h1
  style={{
    fontSize: "72px",
    fontWeight: "900",
    color: "#fff",
    marginBottom: "10px",
    textShadow: "0 0 25px rgba(150,100,255,.6)"
  }}
>
  CareerQuest 🚀
</h1>

<p
  style={{
    fontSize: "30px",
    color: "#eee",
    marginBottom: "40px"
  }}
>
  AI-Powered Career Exploration Toy
</p>

       
        </div>
<button
  className="primary-btn"
  style={{
    width: "360px",
    height: "80px",
    fontSize: "30px"
  }}
  onClick={() => navigate("/register")}
>
  Start Adventure 🚀
</button>

      </div>
    </div>
  );
}

export default Splash;