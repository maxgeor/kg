import React from "react";
import Link from "next/link";

export default function Contact() {
  return (
    <>
      <div className="col-span-full lg:col-span-4">
        <p className="-my-1">
          To buy a knife or connect,{" "}
          <Link
            href="https://ig.me/m/kg.handcrafted"
            target="_blank"
            className="underline"
          >
            DM me on Instagram
          </Link>{" "}
          or send an email.
        </p>
      </div>
      <div className="lg:order-first col-span-full lg:col-span-1 flex flex-col gap-y-3 -my-1">
        <table cellPadding={0} cellSpacing={0}>
          <tbody>
            <tr>
              <td className="w-3 pr-3 pb-1">i:</td>
              <td className="pb-1">
                <Link
                  href="https://www.instagram.com/kg.handcrafted/"
                  target="_blank"
                  className="underline -my-1"
                >
                  @kg.handcrafted
                </Link>
              </td>
            </tr>
            <tr>
              <td className="w-3 pr-3">e:</td>
              <td>kevin_g8405@hotmail.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
