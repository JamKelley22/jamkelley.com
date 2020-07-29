import * as React from "react";

interface IContactProps {}

const Contact: React.FunctionComponent<IContactProps> = (props) => {
  return (
    <div>
      <form action="mailto:someone@example.com">
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          E-mail:
          <input
            type="text"
            name="mail"
            // value={email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              // setEmail(event.target.value)
            }}
          />
        </label>
        <label>
          Comment:
          <input type="text" name="comment" size={50} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Contact;
