import { Camera } from "lucide-react";
import { useState } from "react";

export default function Onboarding() {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = async () => {
    // Upload profilePic to Firebase Storage, get URL
    // Update Firestore with username, bio, and profilePic URL
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top_left,_#1c1c3b,_#0f1021,_#351a4f)] px-4">
      <div className="max-w-md w-full bg-background-card/70 backdrop-blur-md p-8 rounded-2xl shadow-glass border border-card">
        <h1 className="text-text-default text-3xl font-bold text-center mb-6">
          Set Up Your Profile
        </h1>

        <div className="flex flex-col items-center mb-6">
          <label htmlFor="profilePic" className="cursor-pointer group">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-input-background border border-input-border group-hover:border-input-focus transition-all duration-200 flex flex-col items-center justify-center text-text-muted text-sm relative">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <Camera className="w-5 h-5 mb-1 opacity-70" />
                  <span className="text-xs opacity-80">Upload Photo</span>
                </div>
              )}
            </div>
          </label>
          <input
            id="profilePic"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-text-muted block mb-1" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-input-background text-text-default placeholder-text-secondary border border-input-border focus:outline-none focus:ring-2 focus:ring-input-focus"
            />
          </div>
          <div>
            <label className="text-text-muted block mb-1" htmlFor="bio">
              Bio <span className="text-text-secondary">(optional)</span>
            </label>
            <textarea
              id="bio"
              rows="3"
              placeholder="Tell us something about you"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-input-background text-text-default placeholder-text-secondary border border-input-border focus:outline-none focus:ring-2 focus:ring-input-focus resize-none"
            />
          </div>
        </div>

        <button
          onClick={handleContinue}
          className="w-full mt-6 py-2 rounded-lg bg-button-default hover:bg-button-hover text-white font-semibold shadow-glass transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
