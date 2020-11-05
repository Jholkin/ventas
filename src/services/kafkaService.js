const { Kafka } = require("kafkajs");
const KafkaClient = require("kafka-node");
const config = require("../config/kafka");

const kafka = new Kafka({
    clientId: "my-app",
    brokers: [config.host+':'+config.broker1_port],
});

const admin = kafka.admin();
const producer = kafka.producer();
//const consumer = kafka.consumer();

exports.createTopic = async (params)=>{
    try {
        const topic = {
            topic: params.topicName,
            numPartition: 1,
            replicationFactor: 1
        }
    
        await admin.connect();
        const topicCreated = await admin.createTopics({
            waitForLeaders: true,
            topics: [topic]
        });
        return topicCreated;
    } catch (error) {
        throw error;
    }
}

exports.listTopics = async ()=>{
    try {
        await admin.connect();
        let topics = await admin.listTopics();
        await admin.disconnect();
        return topics;
    } catch (error) {
        throw error;
    }
}

exports.deleteTopic = async (data)=>{
    try {
        await admin.connect();
        const topicDeleted = await admin.deleteTopics({
            topics: [data.topicName]
        });
        await admin.disconnect();
        return topicDeleted;
    } catch (error) {
        throw error;
    }
}

exports.producer = async (data)=>{
    try {
        await producer.connect();
        const messagesSended = await producer.send({
            topic: data.topicName,
            messages: [
                {value: JSON.stringify(data.message)}
            ]
        });
        console.log("mensage enviado : ", messagesSended);
        await producer.disconnect();
        return {topic: messagesSended.topicName, data: data.message};
    } catch (error) {
        console.log("ERROR: ", error);
        throw error;
    }
}

exports.consumer = ()=>{
    try {
        var kafkaClient = new kafka.KafkaClient({ kafkaHost: '23.99.182.90:9092' });
        var consumer = new kafka.Consumer(kafkaClient, [{ topic: 'test' }]);
        consumer.on('message', (message) => {
            console.log(message.value);
            var venta = JSON.parse(message.value);
        });

        return venta;
    } catch (error) {
        throw error;
    }
}