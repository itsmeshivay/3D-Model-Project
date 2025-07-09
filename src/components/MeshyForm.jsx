import React, { useState } from "react";
import ModelViewer from "./ModelViewer";
import Loader from "./Loader";

const MeshyForm = () => {
  const [prompt, setPrompt] = useState("");
  const [status, setStatus] = useState("");
  const [modelUrl, setModelUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Generating model");
    setModelUrl("");

    // ✅ Mock mode — since real API key is not available
    console.log("Simulating 3D model generation for:", prompt);
    setStatus("Task started: mock-task-id-1234");

    // Simulate API delay and model ready
    setTimeout(() => {
      setModelUrl("https://modelviewer.dev/shared-assets/models/Astronaut.glb");
      setStatus("Model ready!");
    }, Math.random() * 2000 + 2000);

    // ✅ If you had real API key:
    /*
    try {
      const headers = {
        Authorization: "Bearer YOUR_API_KEY",
        "Content-Type": "application/json"
      };

      const payload = {
        mode: "preview",
        prompt: prompt,
        art_style: "realistic",
        should_remesh: true
      };

      const response = await fetch("https://api.meshy.ai/openapi/v2/text-to-3d", {
        method: "POST",
        headers,
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      console.log("POST response:", data);

      if (!response.ok) {
        setStatus(Error: ${data.message || "POST failed"});
        return;
      }

      const taskId = data.result;
      setStatus(Task started: ${taskId});

      let done = false;
      while (!done) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const checkRes = await fetch(https://api.meshy.ai/openapi/v2/text-to-3d/${taskId}, { headers });
        const checkData = await checkRes.json();
        console.log("Check data:", checkData);

        if (!checkRes.ok) {
          setStatus(Error: ${checkData.message || "Check failed"});
          done = true;
          return;
        }

        if (checkData.status === "texturing_succeeded") {
          setModelUrl(checkData.model_url);
          setStatus("Model ready!");
          done = true;
        }
      }

    } catch (err) {
      console.error("Error:", err);
      setStatus("Error occurred. Check console.");
    }
    */
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="prompt-input"
          placeholder="Enter 3D object prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
        <button
          type="submit"
          className="button-generate"
          disabled={status.toLowerCase().includes("sending")}
        >
          {status.toLowerCase().includes("sending") ? "Please wait..." : "Generate 3D Model"}
        </button>
      </form>

      <p>{status}</p>

      {status.toLowerCase().includes("task started") && <Loader />}

      {modelUrl && <ModelViewer url={modelUrl} />}
    </div>
  );
};

export default MeshyForm;