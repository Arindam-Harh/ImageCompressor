import "./Home.css";

export const Home = () => {
  return (
    <div className="home-page">
      <div className="home-card">
        <form className="home-form">
          <h1>Upload Image</h1>
          <p className="home-hint">Choose an image and press Process.</p>

          <label htmlFor="file" className="home-label">
            Choose Image
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept="image/*"
            className="file-selection"
          />

          <button type="submit" className="home-btn">
            Process
          </button>
        </form>
      </div>
    </div>
  );
};