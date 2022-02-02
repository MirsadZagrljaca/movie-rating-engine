const getUniqueErrorMessage = (err) => {
  let output;

  try {
    let message = err.message.split(":")[3];
    let temp = message.split("{");
    output = "That" + temp + " is already in use";
  } catch (ex) {
    output = "Unique field already exists";
  }
  return output;
};

const getErrorMessage = (err) => {
  let message = "";
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = getUniqueErrorMessage(err);
        break;
      default:
        message = "Something went wrong";
    }
  } else {
    for (let errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }
  return message;
};

export default { getErrorMessage };
