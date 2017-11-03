<template>
    <div>
        <form>
            <div class="card">
                <h4 class="card-header">
                    <div class="pull-right">0 из 12</div>
                    Выбор банды:
                </h4>
                <div class="card-body">
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon">Добавить карту</span>
                            <select class="form-control">
                                <option>Выберите карту</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <h4 class="card-header">
                    <div class="pull-right">0 из 12</div>
                    Objective карты:
                </h4>
                <div class="card-body">
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon">Добавить карту</span>
                            <select class="form-control">
                                <option>Выберите карту</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                    </div>
                    <hr/>
                    <div class="input-group">
                  <span class="input-group-addon">
                    <input type="checkbox">
                  </span>
                        <span class="input-group-addon">$</span>
                        <input type="text" class="form-control" value="Карта номер 1">
                    </div>
                    <div class="input-group">
                  <span class="input-group-addon">
                    <input type="checkbox">
                  </span>
                        <span class="input-group-addon">$</span>
                        <input type="text" class="form-control" value="Карта номер 2">
                    </div>
                    <div class="input-group">
                  <span class="input-group-addon">
                    <input type="checkbox">
                  </span>
                        <span class="input-group-addon">$</span>
                        <input type="text" class="form-control" value="Карта номер 3">
                    </div>
                </div>
            </div>
            <div class="card">
                <h4 class="card-header">
                    <div class="pull-right">0 из 12</div>
                    Power карты:
                </h4>
                <div class="card-body">
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon">Добавить карту</span>
                            <select class="form-control">
                                <option>Выберите карту</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="action-group">
                <button type="submit" class="btn btn-primary">Сохранить</button>
                <button type="submit" class="btn btn-info">Распечатать</button>
            </div>
        </form>
    </div>
</template>

<script>
  export default {
    layout: 'main'
  }
</script>