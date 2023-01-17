<script lang="ts" setup>
import { VNodeRef } from 'vue';
import users from '~/assets/data/users.json';

definePageMeta({
  layout: 'empty'
});

const userDefault = {
  id: 0,
  name: '',
  username: '',
  email: '',
  phone: '',
  address: '',
  gender: 1,
  company: {
    name: '',
    catchPhrase: '',
    bs: ''
  }
};
const isShowModal = ref(false);
const user = ref(userDefault);
const isEdit = computed(() => !!user.value.id);
const formRef = ref<VNodeRef | null>(null);
const requiredRule = [(value: any) => !!value || 'This field is required'];
const columns = [
  { key: 'id' },
  { key: 'name' },
  { key: 'username' },
  { key: 'email' },
  { key: 'phone' },
  { key: 'website' },
  { key: 'company.name', label: 'company' },
  { key: 'actions', label: ' ', width: 80 }
];

function openModal(index?: number) {
  user.value = index !== undefined ? users[index] : userDefault;
  isShowModal.value = true;
}
function closeModal() {
  isShowModal.value = false;
}
function handleAddOrEditUser() {
  const isValid = formRef.value.validate();
  if (isValid) {
    console.log('User:::', user);
    closeModal();
  }
}
</script>

<template>
  <article class="vuestic-example">
    <h2 class="heading">USERS</h2>
    <nav class='actions'>
      <va-button
        class="button -modalopen"
        @click="openModal()"
      >
        ADD USER
      </va-button>
    </nav>
    <va-data-table class="table" :items="users" :columns="columns">
      <template #cell(actions)="{ rowIndex }">
        <va-button
          preset="plain"
          icon="edit"
          @click="openModal(rowIndex)"
        />
        <va-button preset="plain" icon="delete" />
      </template>
    </va-data-table>
    <va-modal
      hide-default-actions
      class="user-modal"
      size="large"
      v-model="isShowModal"
    >
      <template #header>
        <div class='user-modal-header'>
          <p class='header'>{{ isEdit ? 'Edit User' : 'Add User' }}</p>
        </div>
      </template>
      <va-form ref="formRef" class="user-modal-content">
        <section class="group -name">
          <label class="input -name">
            <span class="label">Name</span>
            <va-input
              class="input -name"
              v-model="user.name"
              :rules="requiredRule"
            >
            </va-input>
          </label>
          <label class="input -username">
            <span class="label">Username</span>
            <va-input
              class="input -username"
              v-model="user.username"
              :rules="requiredRule"
            >
            </va-input>
          </label>
        </section>
        <h3 class="title -detail">Detail</h3>
        <section class="group -detail">
          <label class="input -email">
            <span class="label">Email</span>
            <va-input
              class="input"
              v-model="user.email"
              :rules="requiredRule"
            >
              <template #append>A</template>
            </va-input>
          </label>
          <label class="input -phone">
            <span class="label">Phone</span>
            <va-input
              class="input"
              v-model="user.phone"
              :rules="requiredRule"
            >
              <template #append>B</template>
            </va-input>
          </label>
          <label class="input -address">
            <span class="label">Address</span>
            <va-input
              class="input"
              v-model="user.address"
              :rules="requiredRule"
            >
              <template #append>C</template>
            </va-input>
          </label>
          <label class="input -gender">
            <span class="label">Gender</span>
            <va-radio
              v-model="user.gender"
              label="Male"
              class="radio"
              :option="1"
            />
            <va-radio
              v-model="user.gender"
              label="Female"
              class="radio"
              :option="0"
            />
          </label>
        </section>
        <h3 class="title -company">Company</h3>
        <section class="group -company">
          <label class="input">
            <span class="label">Name</span>
            <va-input class="input" v-model="user.company.name">
              <template #append>D</template>
            </va-input>
          </label>
          <label class="input">
            <span class="label">Catch phrase</span>
            <va-input class="input" v-model="user.company.catchPhrase">
              <template #append>E</template>
            </va-input>
          </label>
          <label class="input">
            <span class="label">BS</span>
            <va-input class="input" v-model="user.company.bs">
              <template #append>F</template>
            </va-input>
          </label>
        </section>
      </va-form>
      <template #footer>
        <div class='user-modal-footer'>
          <va-button class='action -cancel' color='secondary' @click="closeModal">
            CANCEL
          </va-button>
          <va-button class='action -save' @click="handleAddOrEditUser">
            {{ isEdit ? 'SAVE' : 'ADD' }}
          </va-button>
        </div>
      </template>
    </va-modal>
  </article>
</template>

<style scoped lang="scss">
.vuestic-example {
  background-color: #f9f9f7;
  padding: 15px;

  > .heading {
    margin-bottom: 15px;
    border-left: 3px solid var(--va-primary);
    border-bottom: 1px solid var(--va-primary);
    padding: 8px;
    font-size: 1.25rem;
  }
  > .actions {
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 15px;
  }
  > .actions > .button.-modalopen {
    --va-button-size: 1.25rem;
    --va-button-font-weight: 400;
    --va-button-content-px: 1rem;
    --va-button-content-py: 0.35rem;
    --va-button-border-radius: 0.5rem;
  }
  > .table {
    --va-data-table-thead-border: 1px solid var(--va-primary);
    --va-data-table-thead-font-size: 1rem;
    --va-data-table-thead-font-weight: 500;
    border-radius: 10px;
    background-color: var(--va-background-element);
    width: 100%;

    :deep(
      .va-data-table__table-tbody > .va-data-table__table-tr:not(:last-child)
    ) {
      border-bottom: 1px solid var(--va-primary);
    }
  }
}
.user-modal-header {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 1.25rem;
}
.user-modal-content {
  > .title {
    margin: 12px 0;
  }
  > .group {
    display: grid;
    grid-template-columns: repeat(2, 400px);
    gap: 1rem 5rem;
    border-radius: 10px;
    background-color: #fff;
    padding: 1rem;
    @include sm-and-below {
      grid-template-columns: 500px;
      gap: 1rem 1rem;
    }
  }
  > .group > .input {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }
  > .group > .input.-gender {
    grid-column: 1 / span 2;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 5px;
    @include sm-and-below {
      grid-column: unset;
    }
  }
  > .group > .input.-gender > .label {
    margin-top: 0;
  }
  > .group > .input.-gender > .radio {
    margin: 0 10px;
  }
  > .group > .input > .label {
    display: inline-block;
    margin-top: 10px;
    width: 100px;
  }
  > .group > .input > .input {
    :deep(.va-input-wrapper__container > .va-input-wrapper__field) {
      --va-form-element-default-width: 150px;
      border-radius: 4px;
      max-width: 250px;
    }
  }
}
.user-modal-footer {
  > .action {
    margin: 0 5px;
  }
}
</style>
