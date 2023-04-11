import styles from "./CallMyPokemon.module.css";
import { FormEvent } from "react";
import type  { parsePhoneNumber as parsePhoneNumberType, PhoneNumber } from "libphonenumber-js/min";
type CustomElements = HTMLFormControlsCollection & {
  phoneNumber: HTMLInputElement;
};

type CustomForm = HTMLFormElement & {
  readonly elements: CustomElements;
};

let parsePhoneNumber: typeof parsePhoneNumberType | null = null;
let promise: Promise<void> | null = null;

export default function CallMyPokemon() {
  return (
    <div className={styles.callMyPokemon}>
      <h2 className={styles.title}>Call My Pokemon</h2>
      <form
        className={styles.form}
        onSubmit={async (event: FormEvent<CustomForm>) => {
          event.preventDefault();
          const target = event.currentTarget.elements;

          // const { parsePhoneNumber } = await import( "libphonenumber-js/max");
          if (promise) await promise;

          const phoneNumberRawValue = target.phoneNumber.value;
          let phoneNumber: PhoneNumber | undefined;
          try {
            phoneNumber = parsePhoneNumber!(phoneNumberRawValue, "FR");
          } catch (e) {
            console.log(e);
            return;
          }

          if (phoneNumber === undefined || !phoneNumber.isValid()) {
            return;
          }
          alert(`Calling ${phoneNumber.formatInternational()}`);
        }}
      >
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Phone Number"
          onFocus={() => {
            if (parsePhoneNumber != null) {
              return;
            }

            if (promise != null) {
              return
            }

            promise = import(/* webpackChunkName: "libphonenumber_lazy_load" */ "libphonenumber-js/min").then(module => {parsePhoneNumber = module.parsePhoneNumber}).catch(() => {console.log("Rip")});
          }}
        />
        <button type="submit">Call</button>
      </form>
    </div>
  );
}
