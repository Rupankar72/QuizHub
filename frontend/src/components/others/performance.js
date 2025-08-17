import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import Chart from "react-apexcharts";
import Navbar from "./navbar";

const PerformanceGraph = () => {
  const [lang_id, setLangId] = useState("");
  const [performanceData, setPerformanceData] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [initialRenderLangId, setInitialRenderLangId] = useState(true);
  const [initialRenderPerformanceData, setInitialRenderPerformanceData] =
    useState(true);
  const { isOpen, onClose } = useDisclosure(); // ✅ removed onOpen
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [chartScoreData, setChartScoreData] = useState({
    options: {
      chart: {
        id: "line-chart",
      },
      xaxis: {
        categories: [],
      },
      colors: ["#327da8"],
    },
    series: [
      {
        name: "Score Percent",
        data: [],
      },
    ],
  });

  const [chartAccuracyData, setChartAccuracyData] = useState({
    options: {
      chart: {
        id: "line-chart",
      },
      xaxis: {
        categories: [],
      },
      colors: ["#46a832"],
    },
    series: [
      {
        name: "Accuracy",
        data: [],
      },
    ],
  });

  const fetchLanguages = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.get(
        `http://localhost:5000/quiz/languages`,
        config
      );
      setLanguages(response.data);
    } catch (error) {
      console.error("Error fetching language data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.get(
        `http://localhost:5000/performance?uid=${userInfo._id}&lang_id=${lang_id}`,
        config
      );
      setPerformanceData(response.data);
    } catch (error) {
      console.error("Error fetching performance data:", error);
    }
  };

  const updateChartScoreData = () => {
    const categories = performanceData.map((item, index) => String(index + 1));
    const scorePercentData = performanceData.map((item) => item.score_percent);
    setChartScoreData({
      options: {
        ...chartScoreData.options,
        xaxis: {
          ...chartScoreData.options.xaxis,
          categories: categories,
        },
      },
      series: [
        {
          ...chartScoreData.series[0],
          data: scorePercentData,
        },
      ],
    });
  };

  const updateChartAccuracyData = () => {
    const categories = performanceData.map((item, index) => String(index + 1));
    const accuracyData = performanceData.map((item) => item.accuracy);
    setChartAccuracyData({
      options: {
        ...chartAccuracyData.options,
        xaxis: {
          ...chartAccuracyData.options.xaxis,
          categories: categories,
        },
      },
      series: [
        {
          ...chartAccuracyData.series[0],
          data: accuracyData,
        },
      ],
    });
  };

  useEffect(() => {
    fetchLanguages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (initialRenderLangId) {
      setInitialRenderLangId(false);
      return;
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang_id]);

  useEffect(() => {
    if (initialRenderPerformanceData) {
      setInitialRenderPerformanceData(false);
      return;
    }
    if (performanceData.length > 0) {
      updateChartScoreData(performanceData);
      updateChartAccuracyData(performanceData);
    } else {
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [performanceData]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Response Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
        </ModalContent>
      </Modal>

      <Navbar />
      <Box
        p={4}
        borderWidth="1px"
        borderRadius="md"
        background="white"
        textAlign="center"
        width="100vw"
        display="flex"
        flexDirection="column"
      >
        <Text fontSize="3xl" fontWeight="bold" mb={7} mt={12} pt={5}>
          Performance Graph
        </Text>
        <Select
          placeholder="Select Course"
          value={lang_id}
          onChange={(e) => setLangId(e.target.value)}
        >
          {languages.map((language) => (
            <option key={language} value={language}>
              {language.toUpperCase()}
            </option>
          ))}
        </Select>

        {performanceData.length > 0 ? (
          <Box>
            <Box mt={7}>
              <Text fontSize="2xl" color="brown" fontWeight="bold">
                Language: {lang_id.toUpperCase()}
              </Text>
              <Box mt={5}>
                <Text fontSize="2xl" fontWeight="bold" color="blue">
                  Score Percentage Graph
                </Text>
                <Chart
                  options={chartScoreData.options}
                  series={chartScoreData.series}
                  type="line"
                  height={250}
                />
              </Box>
            </Box>

            <Box>
              <Box mt={10}>
                <Text fontSize="2xl" fontWeight="bold" color="green">
                  Accuracy Graph
                </Text>
                <Chart
                  options={chartAccuracyData.options}
                  series={chartAccuracyData.series}
                  type="line"
                  height={250}
                  color="green"
                />
              </Box>
            </Box>
          </Box>
        ) : (
          <Box mt={10}>
            <Text fontSize="xl">No data to show</Text>
          </Box>
        )}
      </Box>
    </>
  );
};

export default PerformanceGraph;
