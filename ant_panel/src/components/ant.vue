<template>
  <v-container>
    <h3 class="text-center"></h3>

    <h4>Antenna Tracker : Location</h4>
    <v-card
      class="pa-10"
      outlined
      shaped
      elevation="3"
      height="200"
      width="700"
      min-width="700"
      min-height="200"
    >
      <v-row>
        <v-col>
          <label for="input-live">Latitude:</label>
          <b-form-input
            id="Lat"
            v-model="loca_obj.myLatitude"
            placeholder="Enter Latitude"
            trim
          ></b-form-input>
        </v-col>
        <v-col>
          <label for="input-live">Longitude:</label>
          <b-form-input
            id="Lon"
            v-model="loca_obj.myLongitude"
            placeholder="Enter Longitude"
            trim
          ></b-form-input>
        </v-col>
        <v-col>
          <label for="input-live">Altitude:</label>
          <b-form-input
            id="Alt"
            v-model="loca_obj.myAltitude"
            placeholder="Enter Altitude"
            trim
          ></b-form-input>
        </v-col>
      </v-row>
      <p></p>
      <v-row>
        <v-btn
          color="indigo"
          large
          block
          outlined
          raised
          rounded
          elevation="2"
          @click="sendloca"
        >
          SEND Location
        </v-btn>
      </v-row>
    </v-card>
    <br /><br />
    <h4>Antenna Tracker : Control Panel</h4>
    <v-card
      class="pa-10"
      outlined
      shaped
      elevation="3"
      height="500"
      width="700"
      min-width="700"
      min-height="500"
    >
      <v-container fluid>
        <v-row>
          <v-col>
            <v-btn
              color="orange"
              large
              block
              outlined
              raised
              rounded
              elevation="2"
              @click="doRun"
            >
              RUN
            </v-btn>

            <br />
          </v-col>
          <v-col> </v-col>
          <v-col> </v-col>
        </v-row>

        <v-row>
          <v-col> </v-col>
          <v-col>
            <v-btn
              color="deep-purple"
              large
              block
              outlined
              raised
              rounded
              elevation="2"
              v-on="{ mousedown: tiltUp, mouseup: tiltUpStop }"
            >
              TILT UP
            </v-btn>

            <br />
            <!--
          <p>{{ tu_val }}</p>
          -->
          </v-col>
          <v-col> </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn
              color="indigo"
              large
              block
              outlined
              raised
              rounded
              elevation="2"
              v-on="{ mousedown: panDown, mouseup: panDownStop }"
            >
              PAN DOWN
            </v-btn>

            <br />
          </v-col>
          <v-col>
            <v-btn
              color="pink"
              large
              block
              outlined
              raised
              rounded
              elevation="2"
              @click="init"
            >
              INIT
            </v-btn>

            <br />
          </v-col>
          <v-col>
            <v-btn
              color="indigo"
              large
              block
              outlined
              raised
              rounded
              elevation="2"
              v-on="{ mousedown: panUp, mouseup: panUpStop }"
            >
              PAN UP
            </v-btn>

            <br />
          </v-col>
        </v-row>

        <v-row>
          <v-col> </v-col>
          <v-col>
            <v-btn
              color="deep-purple"
              large
              block
              outlined
              raised
              rounded
              elevation="2"
              v-on="{ mousedown: tiltDown, mouseup: tiltDownStop }"
            >
              TILT DOWN
            </v-btn>

            <br />
          </v-col>
          <v-col> </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
//const mqtt = require('mqtt');
import axios from "axios";
import { mixin as VueTimers } from "vue-timers";
import mqtt from "mqtt";
import { nanoid } from "nanoid";

export default {
  data() {
    return {
      //location data
      loca_obj: {
        mLat: "myLatitude",
        myLatitude: 0,
        mLon: "myLongitude",
        myLongitude: 0,
        mAlt: "myAltitude",
        myAltitude: 0,
      },

      motorControlHost: "localhost",
      motorControlPort: "8883",
      motorControlTopic: "/Ant_Tracker/Control_Data",

      motorLocationHost: "localhost",
      motorLocationPort: "8883",
      motorLocationTopic: "/Ant_Tracker/Location_Data",

      console_text_message: "",
      chk: "",

      response_text: "",
      connected: false,
      rev_connted: false,

      // noti를 받기 위한 포트
      host: "127.0.0.1",
      port: "7579",

      client: {
        connected: false,
        loading: false,
      },
      connection: {
        //mqtt 연결을 위한 포트
        host: "127.0.0.1",
        port: 8883,
        endpoint: "",
        clean: true,
        connectTimeout: 4000,
        reconnectPeriod: 4000,
        clientId: "jiho_" + nanoid(15),
        username: "keti_muv",
        password: "keti_muv",
      },
    };
  },

  mixins: [VueTimers],

  timers: {
    getData: { time: 1000, repeat: true },
  },

  methods: {
    sendloca: function () {
      this.doPublish(
        this.motorLocationTopic,
        "{" +
          JSON.stringify(this.loca_obj.mLat) +
          ":" +
          this.loca_obj.myLatitude +
          "," +
          JSON.stringify(this.loca_obj.mLon) +
          ":" +
          this.loca_obj.myLongitude +
          "," +
          JSON.stringify(this.loca_obj.mAlt) +
          ":" +
          this.loca_obj.myAltitude +
          "}"
      );
    },

    tiltUp: function () {
      this.doPublish(this.motorControlTopic, "tilt_up");
    },
    tiltUpStop: function () {
      this.doPublish(this.motorControlTopic, "stop");
    },

    tiltDown: function () {
      this.doPublish(this.motorControlTopic, "tilt_down");
    },
    tiltDownStop: function () {
      this.doPublish(this.motorControlTopic, "stop");
    },
    panDown: function () {
      this.doPublish(this.motorControlTopic, "pan_down");
    },
    panDownStop: function () {
      this.doPublish(this.motorControlTopic, "stop");
    },
    panUp: function () {
      this.doPublish(this.motorControlTopic, "pan_up");
    },
    panUpStop: function () {
      this.doPublish(this.motorControlTopic, "stop");
    },
    doRun: function () {
      this.doPublish(this.motorControlTopic, "run");
    },
    init: function () {
      this.doPublish(this.motorControlTopic, "init");
    },

    onMessageHandler(topic, message) {
      let chkTopic = topic.substr(0, 7);

      if (chkTopic === "/oneM2M") {
        console.log(message.toString());
      }
    },

    doSubscribe(topic) {
      if (this.client.connected) {
        const qos = 0;
        this.client.subscribe(topic, { qos }, (error) => {
          if (error) {
            console.log("Subscribe to topics error", error);
            return;
          }
        });
      }
    },

    doUnSubscribe(topic) {
      if (this.client.connected) {
        this.client.unsubscribe(topic, (error) => {
          if (error) {
            console.log("Unsubscribe error", error);
          }

          console.log("Unsubscribe to topics (", topic, ")");
        });
      }
    },

    doPublish(topic, payload) {
      if (this.client.connected) {
        this.client.publish(topic, payload, 0, (error) => {
          if (error) {
            console.log("Publish error", error);
          }
          console.log("payload:::::  " + payload);
        });
      }

      if (this.client.connected) {
        this.client.publish(topic, payload, 0, (error) => {
          if (error) {
            console.log("Publish error", error);
          }
        });
      }
    },

    doPublish1(topic, payload) {
      if (this.client.connected) {
        this.client.publish(topic, payload, 0, (error) => {
          if (error) {
            console.log("Publish error", error);
          }
        });
      }

      if (this.client.connected) {
        this.client.publish(topic, payload, 0, (error) => {
          if (error) {
            console.log("Publish error", error);
          }
        });
      }
    },

    createConnection() {
      if (this.client.connected) {
        console.log(
          "DroneInfo",
          this.name,
          "createConnection",
          "destroyConnection"
        );
        this.destroyConnection();
      }

      if (!this.client.connected) {
        this.client.loading = true;
        this.connection.clientId = "mqttjs_" + "jiho" + "_" + nanoid(15);
        this.connection.host = "127.0.0.1";
        const { host, port, endpoint, ...options } = this.connection;
        const connectUrl = `ws://${host}:${port}${endpoint}`;
        try {
          console.log(connectUrl, "===== connectUrl PRINT!!! ====!");
          this.client = mqtt.connect(connectUrl, options);

          this.client.on("connect", () => {
            console.log(host, "Connection succeeded!");

            this.client.connected = true;
            this.client.loading = false;

            //localStorage.setItem('mqttConnection-' + this.name, JSON.stringify(this.client));

            let subtopic = "/oneM2M/req/Mobius2/" + "Sketi" + "/#";

            this.doUnSubscribe(subtopic);

            setTimeout(() => {
              this.doSubscribe(subtopic);
              console.log("Subscribe to ", subtopic);
            }, 200);
          });

          this.client.on("error", (error) => {
            console.log("Connection failed", error);

            this.destroyConnection();
          });

          this.client.on("close", () => {
            console.log("Connection closed");

            this.destroyConnection();

            this.connection.clientId = "mqttjs_" + this.name + "_" + nanoid(15);
          });

          this.client.on("message", (topic, message) => {
            // this.receiveNews = this.receiveNews.concat(message)
            console.log(" ");
            console.log(`Received message ${message} from topic ${topic}`);
            console.log(" ");
            console.log(
              `Received message:::::: ${message} from topic ::::::: ${topic}`
            );

            let obj = JSON.parse(message);

            //let antobj = JSON.parse(message);

            // JSON.stringfy(value, replacer, space)
            this.console_text_message = JSON.stringify(obj, null, 2);

            //console.log(topic.split('/')[4], message.toString());

            let payload = {};
            payload.topic = topic;
            payload.message = message;

            this.onMessageHandler(payload.topic, payload.message);
          });
        } catch (error) {
          console.log("mqtt.connect error", error);
          this.client.connected = false;
        }
      }
    },

    destroyConnection() {
      if (this.client.connected) {
        try {
          if (Object.hasOwnProperty.call(this.client, "__ob__")) {
            this.client.end();
          }

          this.client = {
            connected: false,
            loading: false,
          };

          console.log(this.name, "Successfully disconnected!");

          //localStorage.setItem('mqttConnection-' + this.name, JSON.stringify(this.client));
        } catch (error) {
          this.client = {
            connected: false,
            loading: false,
          };
          //localStorage.setItem('mqttConnection-' + this.name, JSON.stringify(this.client));

          console.log("Disconnect failed", this.name, error.toString());
        }
      }
    },

    getData() {
      axios.get("http://localhost:3000/getdata").then((response) => {
        console.log(response.data);
        return (this.response_text = JSON.stringify(
          response.data,
          undefined,
          2
        ));
      });
    },

    recv_start() {
      this.$timer.start("getData");
      this.rev_connted = true;
    },
    recv_stop() {
      this.$timer.stop("getData");
      this.rev_connted = false;
    },

    //method end
  },

  created() {
    this.createConnection();
  },

  beforeDestroy() {
    this.destroyConnection();
  },

  //export end
};
</script>
