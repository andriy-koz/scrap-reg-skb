const ListItem = props => {
  const { model, name, code, amount } = props;

  console.log(model, name, code, amount);

  return (
    <li>
      <div>
        <p>
          {name}
          <span>{amount}</span>
        </p>
      </div>
      <div>
        <p>
          {model}
          <span>{code}</span>
        </p>
      </div>
    </li>
  );
};

export default ListItem;
