<template>
  <div>
    <h1 class="title">Basic Information</h1>
    <div class="center">
      <FloatLabel>
        <InputText id="firstname" v-model="firstname" class="InputText"
          @input="$emit('update:firstName', $event.target.value)" />
        <label for="firstname">First Name</label>
      </FloatLabel>

      <FloatLabel>
        <InputText id="lastname" v-model="lastname" class="InputText"
          @input="$emit('update:lastName', $event.target.value)" />
        <label for="lastname">Last Name</label>
      </FloatLabel>

      <FloatLabel>
        <InputText id="phone" v-model="phone"  class="InputText" mask="999 999 9999" placeholder="999 999 9999" @input="$emit('update:Phone', $event.target.value)" />
        <label for="phone">Phone</label>
      </FloatLabel>

      <FloatLabel>
        <InputText id="email" v-model="email" class="InputText"
          @input="$emit('update:email', $event.target.value)" />
        <label for="email">Email</label>
      </FloatLabel>

      <Dropdown v-model="selectedCountry" :options="countries" filter optionLabel="name"
        placeholder="Select a Country" class="w-full md:w-14rem" @change="$emit('update:country', $event.value)">
        <template #value="slotProps">
          <div v-if="slotProps.value" class="flex align-items-center">
            <div>{{ slotProps.value.name }}</div>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <template #option="slotProps">
          <div class="flex align-items-center">
            <img :alt="slotProps.option.label"
              src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
              :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px" />
            <div>{{ slotProps.option.name }}</div>
          </div>
        </template>
      </Dropdown>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const firstname = ref('');
const lastname = ref('');
const phone = ref('');
const email = ref('');
const selectedCountry = ref();
const countries = ref([
  { name: 'Australia', code: 'AU' },
  { name: 'Brazil', code: 'BR' },
  { name: 'China', code: 'CN' },
  { name: 'Egypt', code: 'EG' },
  { name: 'France', code: 'FR' },
  { name: 'Germany', code: 'DE' },
  { name: 'India', code: 'IN' },
  { name: 'Japan', code: 'JP' },
  { name: 'Spain', code: 'ES' },
  { name: 'United States', code: 'US' }
]);

const emit = defineEmits(['update:firstName', 'update:lastName', 'update:phone', 'update:email', 'update:country']);

console.log('Phone value:', phone.value); // Log phone value on component initialization

</script>

<style scoped>

.p-float-label input {
  margin: 1rem 0;
  padding: 0.7rem;
  width: 40dvw;
}

.p-dropdown {
  padding: 0.3rem;
  width: 40dvw;
}

.title {
  padding: 1rem;
  text-align: center;
}

.center {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media only screen and (max-width: 600px) {
  .p-float-label input {
    width: 65dvw;
  }

  .p-dropdown {
    padding: 0.3rem;
    width: 65dvw;
  }
}
</style>
