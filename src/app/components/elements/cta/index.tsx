const CTA = () => {
  return (
    <div className="border rounded-lg p-10 min-w-[800px] flex flex-col space-y-4 my-5">
      <h3>Subscribe for more</h3>

      <form action="" className="flex flex-col space-y-4">
        <input
          type="text"
          name="subscribe"
          className="rounded-md shadow-md p-3"
        />
        <button type="submit" className="border p-4 rounded-md w-1/2 mx-auto">
          {" "}
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default CTA;
