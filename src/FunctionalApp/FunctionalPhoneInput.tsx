import { Fragment, useRef } from "react";
import { ErrorMessage } from "../ErrorMessage";
import {
  getRefObjArr,
  makePlaceholder,
  setArray,
  switchInput,
} from "../ts-functions/functions";
import { isValidNumber } from "../utils/validations";

export const FunctionalPhoneInput = ({
  label,
  handlePhoneArr,
  phoneArr,
  error,
  submitted,
}: {
  handlePhoneArr: (phoneArr: string[]) => void;
  phoneArr: string[];
  error: string;
  submitted: boolean;
  label: string;
}) => {
  const phoneRefArr = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const phoneRefArrLen = [2, 2, 2, 1];

  const refObjArr = getRefObjArr(phoneRefArr, phoneRefArrLen);
  return (
    <>
      <div className="input-wrap">
        <label htmlFor="phone">{label}:</label>
        <div id="phone-input-wrap">
          {refObjArr.map((ref) => {
			const refIndex = refObjArr.indexOf(ref)
            return (
              <Fragment
                key={(ref.key += `input-${refIndex + 1}`)}
              >
                <input
                  type="text"
                  ref={ref.input}
                  maxLength={ref.length}
                  id={ref.key}
                  placeholder={makePlaceholder(ref.length)}
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
                      else
                        e.currentTarget.value =
                          phoneArr[refIndex];
                    }
                    switchInput(
                      phoneRefArr[refIndex],
                      phoneRefArr
                    );
                  }}
                  value={phoneArr[refIndex]}
                />
                {refIndex !== refObjArr.length - 1 ? "-" : null}
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
};
