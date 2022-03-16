import React from "react";
import { AccountLayout } from "src/layouts/AccountLayout";

const PrivacyPolicy = () => {
  return <div>Privacy Policy</div>;
};

const title = "プライバシーポリシー";
PrivacyPolicy.getLayout = (page) => AccountLayout(page, title);

export default PrivacyPolicy;
