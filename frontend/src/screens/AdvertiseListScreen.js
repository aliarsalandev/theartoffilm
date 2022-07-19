import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAdvertisments, updateAdvertisement } from "../helpers/advertise";

import PageLayout from "../layouts/page";

export default function AdvertiseListScreen() {
  const [advertisements, setAdvertisements] = useState([]);

  const { userInfo } = useSelector((state) => state.userSignin);
  useEffect(() => {
    getAdvertisments(userInfo).then((data) => {
      console.log(data?.advertisements);
      setAdvertisements(data?.advertisements);
    });
  }, [userInfo]);

  return (
    <PageLayout>
      <div>
        <h1>Advertise List</h1>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Image</th>
              <th>Link</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {advertisements?.map((advertisement) => (
              <tr key={advertisement._id}>
                <td>{advertisement.title}</td>
                <td>
                  <div
                    className={"flex row justify-center"}
                    style={{ height: 120, width: 120 }}
                  >
                    <img
                      src={`${advertisement.image}`}
                      alt="advertisment"
                      style={{ height: "inherit" }}
                    />
                  </div>
                </td>
                <td>
                  <a className={"m-2"} href={advertisement.link}>
                    {advertisement.link}
                  </a>
                </td>
                <td>
                  <select
                    onChange={(e) => {
                      updateAdvertisement(userInfo, {
                        ...advertisement,
                        active: !advertisement.active,
                      }).then((advertise) => {
                        const newAdvertisements = advertisements;
                        const update_advertisments = [
                          ...newAdvertisements.filter(
                            (advertisement) =>
                              advertisement._id !== advertise._id
                          ),
                          advertise,
                        ];
                        setAdvertisements(update_advertisments);
                      });
                    }}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageLayout>
  );
}
