import {
  Button,
  Carousel,
  CarouselProps,
  Drawer,
  List,
  Tag,
  Rate,
  Form as AntdForm,
  Input,
  message,
  Upload,
} from "antd";
import CustomTable from "../../components/common/table/CustomTable";
import CustomLayout from "../../components/layout/custom-layout/CustomLayout";
import useFetchData from "../../hooks/useFetchData";
import { useAppSelector } from "../../redux/hooks";
import { Navigate } from "react-router-dom";
import moment from "moment";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import CustomButton from "../../components/ui/button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import usePostData from "../../hooks/usePostData";
import TextArea from "antd/es/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";

interface IFormInput {
  review: string;
  rating: number;
}
const schema = yup
  .object({
    review: yup.string().required("Review is required").min(4).max(1000),
    rating: yup.number().required("Rating is required"),
    // .min(0, 'Minumum rating is 0')
    // .max(0, 'Max rating is 5'),
  })
  .required();
const Journal = () => {
  const user = useAppSelector((state) => state.auth.user);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const settings: CarouselProps = {
    dots: true,
    infinite: true,
    draggable: true,
    arrows: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const [showAddReviewDrawer, setShowAddReviewDrawer] = useState(false);
  const [selectedJournal, setSelectedJournal] = useState<null | any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [reviewStatus, setReviewStatus] = useState("");
  const [journalType, setJournalType] = useState("");
  const {
    data,
    loading: isReviewAdding,
    error: addReviewError,
    postData,
  } = usePostData<any, any>(
    `/review/add/${user?.role}/${selectedJournal?._id}`
  );
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  const {
    data: journalData,
    loading,
    error,
    fetchData,
  } = useFetchData(
    `journal/all/${user.role}?searchTerm=${searchTerm}&type=${journalType}&reviewStatus=${reviewStatus}`
  );

  useEffect(() => {
    fetchData();
  }, [reviewStatus, journalType]);

  const columns = [
    {
      title: "Trader",
      dataIndex: "userId",
      key: "userId",
      render: (_: string, record: any) => {
        return (
          <div>
            <h1>
              {record?.userId?.firstName
                ? record?.userId?.firstName
                : "Couldn't fetch name"}
            </h1>
          </div>
        );
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Submitted",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => {
        return <h1>{moment(text || "").fromNow()}</h1>;
      },
    },
    {
      title: "Status",
      key: "reviewId",
      dataIndex: "reviewId",
      render: (status: string | null) => (
        <Tag color={status ? "green" : "red"}>
          {status ? "Reviewed" : "Pending"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "view",
      dataIndex: "view",
      render: (_: any, record: any) => (
        <Button
          onClick={() => {
            setShowSideDrawer(true);
            setSelectedJournal(record);
          }}
        >
          View
        </Button>
      ),
    },
  ];
  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    try {
      await postData({ value: formData.review, rating: formData.rating });
      if (addReviewError) {
        message.error(addReviewError.message);
      } else message.success("Review Added");
    } catch (error: any) {
      message.error(error?.message || "Failed to add");
    }
  };

  return (
    <CustomLayout>
      <div className="p-10 bg-white">
        <div className="flex w-full justify-between">
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "25%", marginBottom: "20px" }}
          />
          <div className="">
            {/* Journal type  */}
            <select
              className="px-4 py-3 border-2 rounded-xl ml-3 bg-slate-100"
              onChange={(e) => {
                setJournalType(e.target.value);
              }}
            >
              <option value="">All</option>
              <option value="entry">Entry</option>
              <option value="exit">Exit</option>
            </select>

            {/* Review status  */}
            <select
              className="px-4 py-3 border-2 rounded-xl ml-3 bg-slate-100"
              onChange={(e) => {
                setReviewStatus(e.target.value);
              }}
            >
              <option value="">All</option>
              <option value="true">Reviewed</option>
              <option value="false">Not reviewed</option>
            </select>
          </div>
        </div>
        <Drawer
          open={showSideDrawer}
          onClose={() => {
            setShowSideDrawer(false);
            setSelectedJournal(null);
          }}
          width={"50%"}
        >
          <div className=" border-b-[0.5px] border-slate-300 mb-3">
            <div className="flex justify-between">
              <h1 className="text-xl">Journal</h1>
              {selectedJournal?.reviewId ? (
                <Tag color="green" className="flex items-center">
                  {"Reviewed By " + selectedJournal?.review.userId}
                </Tag>
              ) : (
                <div>
                  <span className=" text-orange-500">Review pending </span>
                  <Button
                    onClick={() => {
                      setShowAddReviewDrawer(true);
                    }}
                  >
                    Add Review
                  </Button>
                </div>
              )}
            </div>
            {selectedJournal && (
              <List
                dataSource={selectedJournal && selectedJournal.responses}
                renderItem={(item: any, index: number) => (
                  <List.Item key={index}>
                    <List.Item.Meta
                      title={
                        <div>
                          <h1>Question:</h1>
                          <h1 className="w-full px-3 py-2 rounded-md bg-slate-100 border-[0.5px] border-slate-300">
                            {item?.question?.title}
                          </h1>
                        </div>
                      }
                      description={
                        <div>
                          <h1 className="text-black">Response:</h1>
                          <h1 className=" w-full px-3 py-2 rounded-md bg-slate-100 border-[0.5px] border-slate-300">
                            {item?.answer}
                          </h1>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            )}
          </div>
          <div className=" border-b-[0.5px] border-slate-300 pb-3 mb-3">
            <h1 className="text-xl">Emotions:</h1>
            <h1 className="w-full text-sm text-gray-400 px-3 py-2 rounded-md bg-slate-100 border-[0.5px] border-slate-300">
              {selectedJournal?.emotion?.value || "Not recorded"}
            </h1>
          </div>
          <div>
            <div className="border-b-[0.5px] border-slate-300 pb-3 mb-3">
              <h1 className="text-xl mb-2">Uploads by user:</h1>
              {selectedJournal?.uploads?.length === 0 ? (
                <h1 className="">No Uploads Found</h1>
              ) : (
                <Carousel {...settings}>
                  {selectedJournal?.uploads?.map((upload: any, ind: number) => (
                    <div
                      className=" border-slate-200 border rounded-md"
                      key={ind}
                    >
                      <img
                        src={upload.fileUrl}
                        alt={`Upload ${ind + 1}`}
                        style={{
                          width: "100%",
                          height: "auto",
                          maxHeight: "150px",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  ))}
                </Carousel>
              )}
            </div>
            <div>
              <h1 className="text-xl mb-2">Review By Mentor/Admin:</h1>
              {!selectedJournal?.reviewId ? (
                <h1 className="">No Reviews yet</h1>
              ) : (
                <div>
                  <h1 className="w-full px-3 py-2 rounded-md bg-slate-100 border-[0.5px] border-slate-300">
                    {selectedJournal?.review?.value}
                  </h1>
                  {selectedJournal?.review && (
                    <div className=" flex items-center my-3 space-x-2">
                      <Rate disabled value={selectedJournal?.review?.rating} />{" "}
                      <Tag>{selectedJournal?.review?.rating + " stars"}</Tag>{" "}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          {selectedJournal && selectedJournal?.review && (
            <div>
              <Upload>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </div>
          )}
          <Drawer
            width={"60%"}
            onClose={() => {
              setShowAddReviewDrawer(false);
            }}
            open={showAddReviewDrawer}
          >
            <h1 className="text-xl border-b-[0.4px] border-slate-300 pb-2 mb-2">
              Add Review
            </h1>
            <AntdForm onFinish={handleSubmit(onSubmit)} layout="vertical">
              <AntdForm.Item
                label={<span className="text-black text-base">Review</span>}
                validateStatus={errors.review ? "error" : ""}
                help={errors.review?.message}
              >
                <Controller
                  name="review"
                  control={control}
                  render={({ field }) => (
                    <TextArea
                      {...field}
                      className="text-black focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                />
              </AntdForm.Item>

              <AntdForm.Item
                label={<span className="text-black text-base">Add Rating</span>}
                validateStatus={errors.rating ? "error" : ""}
                help={errors.rating?.message}
              >
                <Controller
                  name="rating"
                  control={control}
                  render={({ field }) => <Rate {...field} />}
                />
              </AntdForm.Item>

              <AntdForm.Item>
                <CustomButton
                  type="primary"
                  htmlType="submit"
                  className=" text-xl py-5 bg-dark-teal rounded-md"
                  isLoading={isReviewAdding}
                  disabled={isReviewAdding}
                >
                  {loading ? "" : "Add Review"}
                </CustomButton>
              </AntdForm.Item>
            </AntdForm>
          </Drawer>
        </Drawer>
        <CustomTable
          //@ts-ignore
          data={journalData && journalData?.data}
          loading={loading}
          totalDocuments={0}
          columns={columns}
        />
      </div>
    </CustomLayout>
  );
};

export default Journal;
