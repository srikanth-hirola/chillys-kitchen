import axios from "axios";
import { server } from "../../server";
import toast from "react-hot-toast";
import WorkerFactory from '../../WorkerFactory';
import myWorker from '../../workers/myWorker.worker'
const workerInstance = new WorkerFactory(myWorker);

// create event
export const createevent = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "eventCreateRequest",
    });

    const result = await axios.post(`${server}/event/create-event`, data);
    dispatch({
      type: "eventCreateSuccess",
      payload: result.data.event,
    });
    toast.success('Event created successfully!');
    window.location.reload()
    dispatch({ type: 'resetSuccessEvent' });
  } catch (error) {
    toast.error(error.response.data.message);
    dispatch({
      type: "eventCreateFail",
      payload: error.response.data.message,
    });
  }
};

// get all events of a shop
export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAlleventsShopRequest",
    });

    const { data } = await axios.get(`${server}/event/get-all-events/${id}`);
    dispatch({
      type: "getAlleventsShopSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAlleventsShopFailed",
      payload: error.response.data.message,
    });
  }
};

// delete event of a shop
export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteeventRequest",
    });

    const { data } = await axios.delete(
      `${server}/event/delete-shop-event/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteeventSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteeventFailed",
      payload: error.response.data.message,
    });
  }
};

// get all events
export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAlleventsRequest",
    });

    const { data } = await axios.get(`${server}/event/get-all-events`);
    workerInstance.postMessage(data);

    workerInstance.onmessage = (res) => {
      dispatch({
        type: "getAlleventsSuccess",
        payload: data.events,
      });
    };

  } catch (error) {
    workerInstance.onerror = (err) => {
      dispatch({
        type: "getAlleventsFailed",
        payload: error.response.data.message,
      });
    };

  }
};
