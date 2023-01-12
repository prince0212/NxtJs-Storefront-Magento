function TextField(props) {
  if (props.isRequired == "yes") {
    return (
      <>
        <label
          htmlFor="{props.name}"
          className="leading-7 text-sm text-gray-600"
        >
          {props.label}
        </label>
        <input
          type="text"
          id={props.name}
          name={props.name}
          defaultValue={props.valueFor}
          required
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </>
    );
  } else {
    return (
      <input
        type="text"
        id={props.name}
        name={props.name}
        defaultValue={props.valueFor}
        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      />
    );
  }
}
export default TextField;
