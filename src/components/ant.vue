<template>
    <v-container>
        <div>
            <v-row>
                <v-col>
                    <v-card class="v1" outlined color="transparent">
                        <br/><br/>
                        <h2 class="f1 font-weight-black">Antenna</h2>
                        <h2 class="f1 font-weight-black">Tracker</h2>
                        <h2 class="f1 font-weight-black">Control Panel</h2>
                    </v-card>
                </v-col>

                <v-col>
                    <v-card class="v1" outlined color="transparent">
                        <v-btn
                            class="b3"
                            color="#AAFF00"
                            x-large
                            block
                            outlined
                            raised
                            elevation="2"
                            v-on="{
                                mousedown: tiltUp,
                                mouseup: tiltUpStop,
                                touchstart: tiltUp,
                                touchend: tiltUpStop,
                            }"
                        >
                            <v-progress-linear
                                color="#AAFF00"
                                :height="150"
                                v-model="pTilt"
                                :orientation="'vertical'"
                                style="pointer-events: none"
                            >
                                <template>
                                    <strong class="bt2">T I L T<br/><br/>U P</strong>
                                </template>
                            </v-progress-linear>
                        </v-btn>
                    </v-card>
                </v-col>

                <v-col>
                    <v-card class="v1" outlined color="transparent">
                        <v-btn
                            class="b0"
                            color="white"
                            x-large
                            block
                            outlined
                            raised
                            elevation="2"
                            @click="doInit"
                        >
                            <strong class="bt1">INIT</strong>
                        </v-btn>
                        <br/>

                        <v-btn
                            class="b0"
                            color="white"
                            x-large
                            block
                            outlined
                            raised
                            elevation="2"
                            @click="doExit"
                        >
                            <strong class="bt1">EXIT</strong>
                        </v-btn>
                    </v-card>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-card class="v1" outlined color="transparent">
                        <v-btn
                            class="b1"
                            color="#FF00AA"
                            x-large
                            block
                            outlined
                            raised
                            elevation="2"
                            v-on="{
                                mousedown: panDown,
                                mouseup: panDownStop,
                                touchstart: panDown,
                                touchend: panDownStop,
                            }"
                        >
                            <v-progress-linear
                                color="#FF00AA"
                                :height="150"
                                reverse
                                v-model="nPan"
                                style="pointer-events: none"
                            >
                                <template>
                                    <strong class="bt1">P A N<br/><br/>D O W N</strong>
                                </template>
                            </v-progress-linear>
                        </v-btn>
                    </v-card>
                </v-col>

                <v-col>
                    <v-card class="v1" outlined color="transparent">
                        <p>&nbsp;</p>
                        <v-row>
                            <v-col></v-col>
                            <v-col>
                                <p class="f2 font-weight-black">PAN</p>
                            </v-col>
                            <v-col>
                                <p class="f2 font-weight-black">{{ myPan }}</p>
                            </v-col>
                            <v-col></v-col>
                        </v-row>
                        <v-row>
                            <v-col></v-col>
                            <v-col>
                                <p class="f2 font-weight-black">TILT</p>
                            </v-col>
                            <v-col>
                                <p class="f2 font-weight-black">{{ myTilt }}</p>
                            </v-col>
                            <v-col></v-col>
                        </v-row>
                    </v-card>
                </v-col>

                <v-col>
                    <v-card class="v1" outlined color="transparent">
                        <v-btn
                            class="b1"
                            color="#FF00AA"
                            x-large
                            block
                            outlined
                            raised
                            elevation="2"
                            v-on="{
                                mousedown: panUp,
                                mouseup: panUpStop,
                                touchstart: panUp,
                                touchend: panUpStop,
                            }"
                        >
                            <v-progress-linear
                                color="#FF00AA"
                                :height="150"
                                v-model="pPan"
                                style="pointer-events: none"
                            >
                                <template>
                                    <strong class="bt1">P A N<br/><br/>U P</strong>
                                </template>
                            </v-progress-linear>
                        </v-btn>
                    </v-card>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <br/>

                    <v-card class="v1" outlined color="transparent">
                        <v-row>
                            <v-col>
                                <p class="f1 font-weight-black">Altitude :</p>
                                <v-text-field
                                    class="text-white"
                                    v-model="altset"
                                    :rules="altset_rule"
                                    label=""
                                    variant="outlined"
                                    color="white"
                                >
                                </v-text-field>

                                <v-btn
                                    class="bb"
                                    color="white"
                                    x-large
                                    block
                                    outlined
                                    raised
                                    elevation="2"
                                    @click="setbtn"
                                >
                                    <strong class="bt1">SET</strong>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>

                <v-col>
                    <v-card class="v1" outlined color="transparent">
                        <v-btn
                            class="b4"
                            color="#AAFF00"
                            x-large
                            block
                            outlined
                            raised
                            elevation="2"
                            v-on="{
                                mousedown: tiltDown,
                                mouseup: tiltDownStop,
                                touchstart: tiltDown,
                                touchend: tiltDownStop,
                            }"
                        >
                            <v-progress-linear
                                color="#AAFF00"
                                :height="150"
                                v-model="nTilt"
                                style="pointer-events: none"
                            >
                                <template>
                                    <strong class="bt3">T I L T<br/><br/>D O W N</strong>
                                </template>
                            </v-progress-linear>
                        </v-btn>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card class="v1" outlined color="transparent">
                        <v-btn
                            class="b0"
                            color="white"
                            x-large
                            block
                            outlined
                            raised
                            elevation="2"
                            @click="doTest"
                        >
                            <strong class="bt1">TEST</strong>
                        </v-btn>
                        <br/>

                        <v-btn
                            class="b0"
                            color="white"
                            x-large
                            block
                            outlined
                            raised
                            elevation="2"
                            @click="doRun"
                        >
                            <strong class="bt1">RUN</strong>
                        </v-btn>
                    </v-card>
                </v-col>
            </v-row>
        </div>

        <br/><br/>

        <div>
            <v-card
                class="pa-10 white--text"
                outlined
                shaped
                elevation="3"
                color="white"
            >
                <v-row>
                    <v-col>
                        <p class="f0 font-weight-black">Drone Information</p>
                    </v-col>
                    <v-col cols=""></v-col>
                </v-row>
                <v-row>
                    <v-col cols="">
                        <v-text-field
                            class="black--text"
                            label="ID :"
                            v-model="drone_info.id"
                            :rules="id_rule"
                            model-value=""
                            prefix=" "
                            color="black"
                        ></v-text-field>

                        <v-text-field
                            class="text-black"
                            label="DRONE :"
                            v-model="drone_info.drone"
                            :rules="drone_rule"
                            model-value=""
                            prefix=" "
                            color="black"
                        ></v-text-field>

                        <v-text-field
                            class="text-black"
                            label="HOST :"
                            v-model="drone_info.host"
                            :rules="host_rule"
                            model-value=""
                            prefix=" "
                            color="black"
                        ></v-text-field>

                        <v-text-field
                            class="text-black"
                            label="GCS :"
                            v-model="drone_info.gcs"
                            :rules="gcs_rule"
                            model-value=""
                            prefix=" "
                            color="black"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="">
                        <v-text-field
                            class="text-black"
                            label="TYPE :"
                            v-model="drone_info.type"
                            :rules="type_rule"
                            model-value=""
                            prefix=" "
                            color="black"
                        ></v-text-field>
                        <v-text-field
                            class="text-black"
                            label="SYSTEM ID :"
                            v-model="drone_info.systemid"
                            :rules="systemid_rule"
                            model-value=""
                            prefix=" "
                            color="black"
                        ></v-text-field>
                        <v-text-field
                            class="text-black"
                            label="GCS IP :"
                            v-model="drone_info.gcsip"
                            :rules="gcsip_rule"
                            model-value=""
                            prefix=" "
                            color="black"
                        ></v-text-field>
                        <v-text-field
                            class="text-black"
                            label="KCMVP :"
                            v-model="drone_info.kcmvp"
                            :rules="kcmvp_rule"
                            model-value=""
                            prefix=" "
                            color="black"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <br/>
                <v-row>
                    <v-col></v-col>
                    <v-col>
                        <v-btn
                            class="sb"
                            x-large
                            block
                            outlined
                            raised
                            elevation="2"
                            @click="savebtn"
                        >
                            <strong class="bt0">SAVE</strong>
                        </v-btn>
                    </v-col>
                    <v-col></v-col>
                </v-row>
            </v-card>
        </div>
    </v-container>
</template>

<script>
import mqtt from "mqtt";
import {nanoid} from "nanoid";
import droneinfo from "@/assets/drone_info.json";

const data = droneinfo;

export default {
    name: "app",
    components: {},

    data() {
        return {
            data,

            drone_info: {
                id: "Mercury",
                drone: "KETI_AIoT_02",
                host: "121.137.228.240",
                gcs: "KETI_MUV",
                type: "ardupilot",
                systemid: "202",
                gcsip: "192.168.202.150",
                kcmvp: "off",
            },

            id_rule: [(v) => !!v || "ID 값은 필수 입력사항입니다."],
            drone_rule: [(v) => !!v || "drone 값은 필수 입력사항입니다."],
            host_rule: [(v) => !!v || "host 값은 필수 입력사항입니다."],
            gcs_rule: [(v) => !!v || "GCS 값은 필수 입력사항입니다."],
            type_rule: [(v) => !!v || "type 값은 필수 입력사항입니다."],
            systemid_rule: [(v) => !!v || "system ID 값은 필수 입력사항입니다."],
            gcsip_rule: [(v) => !!v || "GCS IP 값은 필수 입력사항입니다."],
            kcmvp_rule: [(v) => !!v || "KCMVP 값은 필수 입력사항입니다."],

            altset: "",
            altset_rule: [
                (v) => !!v || "고도값은 필수 입력사항입니다.",
                (v) => /^[0-9]*$/.test(v) || "고도값은 숫자만 입력 가능합니다.",
            ],

            interval: {},

            //location data
            loca_obj: {
                myLatitude: 37.403625,
                myLongitude: 127.16177,
                myAltitude: 0,
            },

            myPan: 0,
            myTilt: 0,

            pPan: 0,
            nPan: 0,

            pTilt: 0,
            nTilt: 0,

            // mqtt 연결부
            client: {
                connected: false,
                loading: false,
            },
            connection: {
                //host: "127.0.0.1",
                //host: data.host,
                host: "",
                port: 8883,
                //port: 1883,
                endpoint: "",
                clean: true,
                connectTimeout: 4000,
                reconnectPeriod: 4000,
                clientId: "jiho_" + nanoid(15),
                username: "keti_muv",
                password: "keti_muv",
            },

            getDataTopic: {
                pan: "/Ant_Tracker/Motor_Pan",
                tilt: "/Ant_Tracker/Motor_Tilt",
            },

            motorControlTopic: "/Panel/Tracker/control",
            altTopic: "/Panel/Tracker/altitude",

            droneTopic: "/Ant_Tracker/drone_info",

            console_text_message: "",
            chk: "",

            response_text: "",
            rev_connted: false,
        };
    },

    methods: {
        savebtn: function () {
            console.log(JSON.stringify(this.drone_info));
            this.doPublish(this.droneTopic, JSON.stringify(this.drone_info));
        },

        onTapItem: function () {
            console.log("Tapped!");
        },

        sendloca: function () {
            console.log(JSON.stringify(this.loca_obj));
            this.doPublish(this.motorLocationTopic, JSON.stringify(this.loca_obj));
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
        doInit: function () {
            this.doPublish(this.motorControlTopic, "init");
        },
        doExit: () => {
            this.doPublish(this.motorControlTopic, "exit");
        },
        doTest: () => {
            this.doPublish(this.motorControlTopic, "test");
        },
        setbtn: function () {
            this.doPublish(this.altTopic, this.altset);
        },

        createConnection() {
            console.log("createConnection () 시작!");
            if (this.client.connected) {
                this.destroyConnection();
            }

            if (!this.client.connected) {
                this.client.loading = true;
                this.connection.clientId = "mqttjs_" + "jiho" + "_" + nanoid(15);

                //this.connection.host = "127.0.0.1";
                this.connection.host = "gcs.iotocean.org";

                //this.connection.host = data.host;
                //this.connection.host = data.gcs_ip.split('.')[0] + '.' + data.gcs_ip.split('.')[1] + '.' + data.gcs_ip.split('.')[2] + '.100';
                console.log("Host is : " + this.connection.host);
                const {host, port, endpoint, ...options} = this.connection;
                const connectUrl = `ws://${host}:${port}${endpoint}`;
                try {
                    this.client = mqtt.connect(connectUrl, options);

                    this.client.on("connect", () => {
                        console.log(connectUrl, "Connection succeeded!");
                        console.log(host, "Connection succeeded!");

                        this.client.connected = true;
                        this.client.loading = false;

                        this.doSubscribe(this.getDataTopic.pan);
                        console.log("pan subscribe !!!! ");
                        this.doSubscribe(this.getDataTopic.tilt);
                        console.log("tilt subscribe !!!! ");

                        //console.log("myTilt: " + this.myTilt);

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

                        if (topic === this.getDataTopic.pan) {
                            this.myPan = parseInt(message.toString()).toFixed(1);
                            this.myPan = parseInt(this.myPan);

                            if (this.myPan > 0) {
                                this.pPan = (this.myPan / 360) * 100;
                                this.pPan = parseInt(this.pPan);
                                this.nPan = 0;
                            }
                            else {
                                this.nPan = Math.abs(this.myPan);
                                this.nPan = (this.nPan / 360) * 100;
                                this.nPan = parseInt(this.nPan);
                                this.pPan = 0;
                            }
                        }
                        else if (topic === this.getDataTopic.tilt) {
                            this.myTilt = parseInt(message.toString()).toFixed(1);
                            this.myTilt = parseInt(this.myTilt);

                            if (this.myTilt > 0) {
                                this.pTilt = (this.myTilt / 360) * 100;
                                this.pTilt = parseInt(this.pTilt);
                                this.nTilt = 0;
                            }
                            else {
                                this.nTilt = Math.abs(this.myTilt);
                                this.nTilt = (this.nTilt / 360) * 100;
                                this.nTilt = parseInt(this.nTilt);
                                this.pTilt = 0;
                            }
                        }
                    });
                }
                catch (error) {
                    console.log("mqtt.connect error", error);
                    this.client.connected = false;

                    setTimeout(this.createConnection, 2000);
                }
            }
        },

        doSubscribe(topic) {
            if (this.client.connected) {
                const qos = 0;
                this.client.subscribe(topic, {qos}, (error) => {
                    if (error) {
                        console.log("Subscribe to topics error", error);
                        return;
                    }

                    console.log("Subscribe to topics (", topic, ")");
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
                });
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
                }
                catch (error) {
                    console.log("Disconnect failed", error.toString());
                }
            }
        },
    },
    created() {
        console.log("created () 시작!");
        this.createConnection();
    },

    mounted() {
        console.log("mounted () 시작!");

        this.interval = setInterval(() => {
            if (this.value === 100) {
                return (this.value = 0);
            }
            this.value += 10;
        }, 2000);
    },
    beforeDestroy() {
        this.destroyConnection();
    },
};
</script>

<style lang="scss">
#app {
    text-align: center;
    font-weight: white;
    color: white;
    background: rgb(53, 53, 53);
    display: flex;
    justify-content: center;
    align-items: center;
}

.text-white input {
    border-color: white;
    text-align: center;
    font-size: 25px;
    letter-spacing: 5px;
    color: white !important;
}

.f0 {
    text-align: left;
    color: black;
    font-weight: black;
    letter-spacing: 3px;
    font-size: 20px;
}

.f1 {
    text-align: center;
    color: white;
    font-weight: white;
    letter-spacing: 5px;
    font-size: 20px;
}

.f2 {
    text-align: center;
    color: white;
    font-weight: white;
    letter-spacing: 8px;
    font-size: 20px;
}

.f3 {
    text-align: center;
    color: white;
    font-weight: white;
    letter-spacing: 3px;
    font-size: 25px;
}

.f4 {
    text-align: center;
    color: white;
    font-weight: white;
    letter-spacing: 3px;
    font-size: 32px;
}

.bt0 {
    text-align: center;
    color: black;
    font-weight: black;
    letter-spacing: 2px;
    font-size: 15px;
}

.bt1 {
    text-align: center;
    color: white;
    font-weight: white;
    letter-spacing: 2px;
    font-size: 15px;
}

.bt2 {
    text-align: center;
    color: white;
    font-weight: white;
    letter-spacing: 2px;
    font-size: 15px;
    transform: rotate(90deg);
}

.bt3 {
    text-align: center;
    color: white;
    font-weight: white;
    letter-spacing: 2px;
    font-size: 15px;
    transform: rotate(270deg);
}

.b0 {
    width: 100px;
    min-width: 100px;
    height: 88px;
    min-height: 88px;
    letter-spacing: 2px;
}

.bb {
    width: 50px;
    min-width: 50px;
    height: 50px;
    min-height: 50px;
}

.sb {
    color: black;
    font-weight: black;
    width: 50px;
    min-width: 50px;
    height: 50px;
    min-height: 50px;
}

.b1 {
    width: 170px;
    min-width: 170px;
    height: 200px;
    min-height: 200px;
}

.b3 {
    width: 200px;
    min-width: 200px;
    height: 200px;
    min-height: 200px;
    transform: rotate(270deg);
}

.b4 {
    width: 200px;
    min-width: 200px;
    height: 200px;
    min-height: 200px;
    transform: rotate(90deg);
}

.v1 {
    width: 200px;
    height: 200px;
    min-width: 200px;
    max-width: 200px;
    min-height: 200px;
    max-height: 200px;
}
</style>
