import { Component, Fragment, createRef } from "react";
import {
  getRefObjArr,
  makePlaceholder,
  setArray,
  switchInput,
} from "../ts-functions/functions";
import { isValidNumber } from "../utils/validations";
import { ErrorMessage } from "../ErrorMessage";

export class ClassPhoneInput extends Component<{
  handlePhoneArr: (phoneArr: string[]) => void;
  phoneArr: string[];
  error: string;
  label: string;
  submitted: boolean;
}> {
  phoneRefArr = [
    createRef<HTMLInputElement>(),
    createRef<HTMLInputElement>(),
    createRef<HTMLInputElement>(),
    createRef<HTMLInputElement>(),
  ];

  phoneRefLenArr = [2, 2, 2, 1];
  refObjArr = getRefObjArr(this.phoneRefArr, this.phoneRefLenArr);

  render() {
    const { handlePhoneArr, phoneArr, error, label, submitted } = this.props;

    return (
      <>
        <div className="input-wrap">
          <label>{label}: </label>
          <div id="phone-input-wrap">
            {this.refObjArr.map((ref) => {
              const refIndex = this.refObjArr.indexOf(ref);
              return (
                <Fragment key={`input-${refIndex + 1}`}>
                  <input
                    type="text"
                    ref={ref.input}
                    maxLength={ref.length}
                    id={ref.key}
                    placeholder={makePlaceholder(ref.length)}
                    value={phoneArr[refIndex]}
                    onChange={(e) => {
                      if (
                        isValidNumber(e.currentTarget.value) ||
                        isValidNumber(phoneArr[refIndex])
                      ) {
                        handlePhoneArr([
                          ...setArray(
                            phoneArr,
                            e.currentTarget.value,
                            refIndex
                          ),
                        ]);
                      } else {
                        if (e.currentTarget.value === "") e.currentTarget.value;
                        else e.currentTarget.value = phoneArr[refIndex];
                      }
                      switchInput(this.phoneRefArr[refIndex], this.phoneRefArr);
                    }}
                  />
                  {refIndex !== this.refObjArr.length - 1 ? "-" : null}
                </Fragment>
              );
            })}
          </div>
        </div>
        <ErrorMessage
          message={error}
          show={submitted && phoneArr.join("").length < 7}
        />
      </>
    );
  }
}
