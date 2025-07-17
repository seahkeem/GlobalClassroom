<template>
    <h1 class="title"> About You </h1>

    <div class="center">
        <!-- Personality Type Dropdown -->
        <Dropdown v-model="selectedPersonality" :options="groupedPersonalities" filter optionLabel="label"
            placeholder="Select a Personality Personality" class="w-full md:w-14rem" @change="$emit('update:mbti', $event.value)">
            <template #value="slotProps">
                <div v-if="slotProps.value" class="flex align-items-center">
                    <div>{{ slotProps.value.label }}</div>
                </div>
                <span v-else>
                    {{ slotProps.placeholder }}
                </span>
            </template>
            <template #option="slotProps">
                <div class="flex align-items-center">
                    <div>{{ slotProps.option.label }}</div>
                </div>
            </template>
        </Dropdown>

        <div class="form-item">
            <textarea placeholder="About you" v-model="about" style="min-height: 5rem;"
                @input="$emit('update:aboutYou', $event.target.value)" />
        </div>
    </div>



</template>

<script setup>
import { ref, defineEmits } from 'vue';

const selectedPersonality = ref();

const groupedPersonalities = ref([
        { label: 'INTJ - Architect', value: 'INTJ' },
        { label: 'INTP - Logician', value: 'INTP' },
        { label: 'ENTJ - Commander', value: 'ENTJ' },
        { label: 'ENTP - Debater', value: 'ENTP' },

        { label: 'INFJ - Advocate', value: 'INFJ' },
        { label: 'INFP - Mediator', value: 'INFP' },
        { label: 'ENFJ - Protagonist', value: 'ENFJ' },
        { label: 'ENFP - Campaigner', value: 'ENFP' },

        { label: 'ISTJ - Inspector', value: 'ISTJ' },
        { label: 'ISFJ - Defender', value: 'ISFJ' },
        { label: 'ESTJ - Executive', value: 'ESTJ' },
        { label: 'ESFJ - Consul', value: 'ESFJ' },

        { label: 'ISTP - Virtuoso', value: 'ISTP' },
        { label: 'ISFP - Adventurer', value: 'ISFP' },
        { label: 'ESTP - Entrepreneur', value: 'ESTP' },
        { label: 'ESFP - Entertainer', value: 'ESFP' }
]);

const emit = defineEmits(['update:aboutYou', 'update:mbti']);


</script>

<style scoped>
.center {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.p-float-label input,
.p-dropdown {
    width: 40dvw;
}

.p-float-label,
.p-dropdown {
    margin-top: 1rem;
    margin-bottom: 1rem;

}

.title {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
}

.input-field {
    padding: 0.5rem;
    width: 100%;
    margin-bottom: 20px;

}

.form-item textarea {
    width: 40dvw;
    padding: 0.6rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    font-size: 1rem;
    color: #333;
    outline: none;
}

.form-item input:hover,
.form-item select:hover,
.form-item textarea:hover {
    border-color: #888;
}

.form-item input:focus,
.form-item select:focus,
.form-item textarea:focus {
    border-color: #0056b3;
    box-shadow: 0 0 5px rgba(0, 86, 179, 0.25);
}

@media only screen and (max-width: 768px) {

    .p-float-label input,
    .p-dropdown {
        width: 80dvw;
    }

    .form-item textarea {
        width: 80dvw;
    }
}
</style>
