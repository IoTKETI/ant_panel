<template>
    <v-container class="ml-10">
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
        <br/><br/>
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

                        <br/>
                    </v-col>
                    <v-col></v-col>
                    <v-col></v-col>
                </v-row>

                <v-row>
                    <v-col></v-col>
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

                        <br/>
                        <!--
                      <p>{{ tu_val }}</p>
                      -->
                    </v-col>
                    <v-col></v-col>
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

                        <br/>
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

                        <br/>
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

                        <br/>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col></v-col>
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

                        <br/>
                    </v-col>
                    <v-col></v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-container>
</template>

<script>
import mqtt from "mqtt";
import {nanoid} from "nanoid";

export default {
    data() {
        return {
            //location data
            loca_obj: {
                myLatitude: 37.403625,
                myLongitude: 127.161770,
                myAltitude: 0,
            },

            // mqtt 연결부
            client: {
                connected: false,
                loading: false,
            },
            connection: {
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

            motorControlTopic: "/Ant_Tracker/Control_Data",
            motorLocationTopic: "/Ant_Tracker/Location_Data",
            // mqtt end

            console_text_message: "",
            chk: "",

            response_text: "",
            rev_connted: false
        };
    },
    methods: {
        sendloca: function () {
            console.log(JSON.stringify(this.loca_obj));
            this.doPublish(
                this.motorLocationTopic, JSON.stringify(this.loca_obj));
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
        // onMessageHandler(topic, message) {
        //     let chkTopic = topic.substr(0, 7);
        //
        //     if (chkTopic === "/oneM2M") {
        //         console.log(message.toString());
        //     }
        // },
        // doSubscribe(topic) {
        //     if (this.client.connected) {
        //         const qos = 0;
        //         this.client.subscribe(topic, {qos}, (error) => {
        //             if (error) {
        //                 console.log("Subscribe to topics error", error);
        //                 return;
        //             }
        //         });
        //     }
        // },
        // doUnSubscribe(topic) {
        //     if (this.client.connected) {
        //         this.client.unsubscribe(topic, (error) => {
        //             if (error) {
        //                 console.log("Unsubscribe error", error);
        //             }
        //
        //             console.log("Unsubscribe to topics (", topic, ")");
        //         });
        //     }
        // },
        doPublish(topic, payload) {
            if (this.client.connected) {
                this.client.publish(topic, payload, 0, (error) => {
                    if (error) {
                        console.log("Publish error", error);
                    }
                    console.log(topic + " - " + payload);
                });
            }
        },
        createConnection() {
            if (this.client.connected) {
                this.destroyConnection();
            }

            if (!this.client.connected) {
                this.client.loading = true;
                this.connection.clientId = "mqttjs_" + "jiho" + "_" + nanoid(15);
                this.connection.host = "127.0.0.1";
                const {host, port, endpoint, ...options} = this.connection;
                const connectUrl = `ws://${host}:${port}${endpoint}`;
                try {
                    this.client = mqtt.connect(connectUrl, options);

                    this.client.on("connect", () => {
                        console.log(connectUrl, "Connection succeeded!");

                        this.client.connected = true;
                        this.client.loading = false;

                        // let subtopic = "/oneM2M/req/Mobius2/" + "Sketi" + "/#";
                        //
                        // this.doUnSubscribe(subtopic);
                        //
                        // setTimeout(() => {
                        //     this.doSubscribe(subtopic);
                        //     console.log("Subscribe to ", subtopic);
                        // }, 200);
                    });

                    this.client.on("error", (error) => {
                        console.log("Connection failed", error);

                        this.destroyConnection();
                    });

                    this.client.on("close", () => {
                        console.log("Connection closed");

                        this.destroyConnection();

                        this.connection.clientId = "mqttjs_" + "jiho" + "_" + nanoid(15);
                    });

                    this.client.on("message", (topic, message) => {
                        console.log("Received " + message.toString() + " From " + topic);
                    });
                } catch (error) {
                    console.log("mqtt.connect error", error);
                    this.client.connected = false;

                    setTimeout(this.createConnection, 2000);
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

                    console.log("Successfully disconnected!");
                } catch (error) {
                    this.client = {
                        connected: false,
                        loading: false,
                    };
                    console.log("Disconnect failed", error.toString());
                }
            }
        },
    },
    created() {
        this.createConnection();
    },
    beforeDestroy() {
        this.destroyConnection();
    }
};
</script>
