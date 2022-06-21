import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import PageLayout from "../layouts/page";
import { siteSettings, updateSettings } from "../helpers/settings";

export default function SettingScreen() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [updated, setUpdated] = useState(false);
  const [settings, setSettings] = useState({
    commission: "",
    stripe_private_key:
      "sk_test_51F61rUBZLziDYSLq3QCTuid32WJCPE30nxxgceggF3Bmq6oTebT3wDV1wLiviHZqQOV30888YPTb8bagyfXcAFG093KvDhPFQ",
    site_logo: "",
    site_favicon: "",
    site_keywords: "",
  });

  // eslint-disable-next-line no-unused-vars
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    try {
      await Axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
    } catch (error) {}
  };

  useEffect(() => {
    siteSettings().then(({ setting }) => {
      console.log(setting);
      setSettings(setting);
    });
  }, []);

  const onChangeHandler = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setUpdated(false);
    const data = new FormData(e.target);
    const site_logo = data.get("site_logo");
    const site_favicon = data.get("site_favicon");
    updateSettings(
      {
        commission: settings.commission,
        stripe_private_key: settings.stripe_private_key,
        site_logo: site_logo.name,
        site_favicon: site_favicon.name,
        site_keywords: settings.site_keywords,
      },
      userInfo
    ).then((res) => {
      console.log(res);
      if ((res.message = "Settings Updated")) setUpdated(true);
    });
  };
  return (
    <PageLayout>
      {updated && <div className="alert alert-success">Settings Updated</div>}
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Settings</h1>
        </div>
        <div>
          <label htmlFor="name">Commission</label>
          <input
            id="commission"
            type="number"
            step={0.01}
            name={"commission"}
            placeholder="Commission"
            onChange={onChangeHandler}
            defaultValue={settings.commission}
          />
        </div>
        <div>
          <label htmlFor="name">STRIPE PRIVATE KEY</label>
          <input
            id="stripe_private_key"
            name={"stripe_private_key"}
            type="text"
            placeholder="STRIPE PRIVATE KEY"
            onChange={onChangeHandler}
            defaultValue={settings.stripe_private_key}
          />
        </div>

        <div>
          <label htmlFor="name">Site Logo</label>
          <input
            id="site_logo"
            name={"site_logo"}
            type="file"
            placeholder="Site Logo"
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <label htmlFor="name">Favicon</label>
          <input
            id="site_favicon"
            name={"site_favicon"}
            type="file"
            placeholder="Site Favicon"
            onChange={onChangeHandler}
          />
        </div>

        <div>
          <label htmlFor="name">Site Keywords</label>
          <input
            id="site_keywords"
            name={"site_keywords"}
            type="text"
            placeholder="Site Keywords"
            onChange={onChangeHandler}
            defaultValue={settings.site_keywords}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </PageLayout>
  );
}
