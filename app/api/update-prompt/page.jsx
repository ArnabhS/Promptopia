import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/dist/client/router"; // Import useSearchParams from the correct location
import Form from "@components/Form";

const UpdatePrompt = () => {
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");


  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setSubmitting] = useState(false);

  
  useEffect(() => {
    const getPromptDetails = async () => {
      try {
        if (promptId) {
          const response = await fetch(/api/prompt/${promptId});
          if (!response.ok) {
            throw new Error("Failed to fetch prompt details");
          }
          const data = await response.json();
          setPost({
            prompt: data.prompt,
            tag: data.tag,
          });
        }
      } catch (error) {
        console.error(error);
      
      }
    };

    getPromptDetails();
  }, [promptId]);

  
  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (!promptId) {
        throw new Error("Missing PromptId!");
      }

      const response = await fetch(/api/prompt/${promptId}, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to update prompt");
      }
    } catch (error) {
      console.error(error);
      
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
