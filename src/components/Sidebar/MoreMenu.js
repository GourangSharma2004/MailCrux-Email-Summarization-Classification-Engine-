import React, { useState } from 'react';
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Typography,
  Divider,
  Switch,
  FormControlLabel,
  IconButton
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import PaymentIcon from '@material-ui/icons/Payment';
import AlarmIcon from '@material-ui/icons/Alarm';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CloseIcon from '@material-ui/icons/Close';
import DateFnsUtils from '@date-io/date-fns';
import AddIcon from '@material-ui/icons/Add';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(() => ({
  menuItem: {
    minWidth: '200px',
  },
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formControl: {
    margin: '8px',
    minWidth: 120,
    width: '100%',
  },
  dialogContent: {
    padding: '16px',
  },
  divider: {
    margin: '16px 0',
  },
  dateTimePickers: {
    marginTop: '16px',
  }
}));

function MoreMenu({ anchorEl, handleClose, dialogOpen, dialogType, handleDialogClose, handleDialogOpen }) {
  const classes = useStyles();
  
  // Automation state
  const [automationName, setAutomationName] = useState('');
  const [triggerType, setTriggerType] = useState('time');
  const [automationActive, setAutomationActive] = useState(true);
  
  // Payment state
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [paymentRecipient, setPaymentRecipient] = useState('');
  const [paymentPurpose, setPaymentPurpose] = useState('');
  const [paymentReference, setPaymentReference] = useState('');
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [paymentRecurring, setPaymentRecurring] = useState(false);
  const [paymentRecurringFrequency, setPaymentRecurringFrequency] = useState('monthly');
  
  // Invoice state
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceClient, setInvoiceClient] = useState('');
  const [invoiceItems, setInvoiceItems] = useState([{ description: '', quantity: 1, price: 0 }]);
  const [invoiceTaxRate, setInvoiceTaxRate] = useState(0);
  const [invoiceDiscount, setInvoiceDiscount] = useState(0);
  const [invoiceNotes, setInvoiceNotes] = useState('');
  const [invoicePaymentTerms, setInvoicePaymentTerms] = useState('14');
  const [invoiceCurrency, setInvoiceCurrency] = useState('USD');
  const [invoiceBranding, setInvoiceBranding] = useState(true);
  const [invoiceStatus, setInvoiceStatus] = useState('draft');
  
  // Alarm/Schedule state
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reminderTitle, setReminderTitle] = useState('');
  const [reminderDescription, setReminderDescription] = useState('');
  const [alarmSound, setAlarmSound] = useState('chime');
  const [alarmPriority, setAlarmPriority] = useState('medium');
  const [alarmRepeat, setAlarmRepeat] = useState('none');
  const [alarmNotification, setAlarmNotification] = useState(['app']);
  const [alarmTags, setAlarmTags] = useState('');
  const [calendarSync, setCalendarSync] = useState(false);
  const [calendarAccount, setCalendarAccount] = useState('');
  
  const handleItemClick = (type) => {
    if (handleDialogOpen) {
      handleDialogOpen(type);
    } else {
      handleClose();
    }
  };
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  
  // Calculate invoice total
  const calculateInvoiceTotal = () => {
    const subtotal = invoiceItems.reduce((sum, item) => {
      return sum + (parseFloat(item.price) * parseInt(item.quantity) || 0);
    }, 0);
    
    const taxAmount = subtotal * (parseFloat(invoiceTaxRate) / 100 || 0);
    const discountAmount = subtotal * (parseFloat(invoiceDiscount) / 100 || 0);
    
    return (subtotal + taxAmount - discountAmount).toFixed(2);
  };
  
  const renderDialogContent = () => {
    switch (dialogType) {
      case 'automate':
        return (
          <>
            <DialogTitle disableTypography className={classes.dialogTitle}>
              <Typography variant="h6">Automate Emails</Typography>
              <IconButton onClick={handleDialogClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
              <TextField
                label="Automation Name"
                variant="outlined"
                fullWidth
                value={automationName}
                onChange={(e) => setAutomationName(e.target.value)}
                className={classes.formControl}
              />
              
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Trigger Type</InputLabel>
                <Select
                  value={triggerType}
                  onChange={(e) => setTriggerType(e.target.value)}
                  label="Trigger Type"
                >
                  <MenuItem value="time">Time-based</MenuItem>
                  <MenuItem value="event">Event-based</MenuItem>
                  <MenuItem value="condition">Condition-based</MenuItem>
                </Select>
              </FormControl>
              
              {triggerType === 'time' && (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container className={classes.dateTimePickers}>
                    <Grid item xs={12} sm={6}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        label="Start Date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <KeyboardTimePicker
                        margin="normal"
                        label="Start Time"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change time',
                        }}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </MuiPickersUtilsProvider>
              )}
              
              <FormControlLabel
                control={
                  <Switch
                    checked={automationActive}
                    onChange={(e) => setAutomationActive(e.target.checked)}
                    color="primary"
                  />
                }
                label="Active"
                className={classes.formControl}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDialogClose} color="primary" variant="contained">
                Save Automation
              </Button>
            </DialogActions>
          </>
        );
      
      case 'payment':
        return (
          <>
            <DialogTitle disableTypography className={classes.dialogTitle}>
              <Typography variant="h6">Make a Payment</Typography>
              <IconButton onClick={handleDialogClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Payment Details
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Amount"
                    variant="outlined"
                    type="number"
                    fullWidth
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    InputProps={{
                      startAdornment: <span>$</span>,
                    }}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Payment Method</InputLabel>
                    <Select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      label="Payment Method"
                      required
                    >
                      <MenuItem value="credit">Credit Card</MenuItem>
                      <MenuItem value="debit">Debit Card</MenuItem>
                      <MenuItem value="paypal">PayPal</MenuItem>
                      <MenuItem value="bank">Bank Transfer</MenuItem>
                      <MenuItem value="crypto">Cryptocurrency</MenuItem>
                      <MenuItem value="apple">Apple Pay</MenuItem>
                      <MenuItem value="google">Google Pay</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Recipient Name"
                    variant="outlined"
                    fullWidth
                    value={paymentRecipient}
                    onChange={(e) => setPaymentRecipient(e.target.value)}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Payment Purpose"
                    variant="outlined"
                    fullWidth
                    value={paymentPurpose}
                    onChange={(e) => setPaymentPurpose(e.target.value)}
                    placeholder="e.g., Monthly Subscription, Invoice #12345"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Reference/Transaction ID"
                    variant="outlined"
                    fullWidth
                    value={paymentReference}
                    onChange={(e) => setPaymentReference(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      label="Payment Date"
                      value={paymentDate}
                      onChange={(date) => setPaymentDate(date)}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      fullWidth
                    />
                  </MuiPickersUtilsProvider>
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={paymentRecurring}
                        onChange={(e) => setPaymentRecurring(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Recurring Payment"
                  />
                </Grid>

                {paymentRecurring && (
                  <Grid item xs={12}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel>Frequency</InputLabel>
                      <Select
                        value={paymentRecurringFrequency}
                        onChange={(e) => setPaymentRecurringFrequency(e.target.value)}
                        label="Frequency"
                      >
                        <MenuItem value="weekly">Weekly</MenuItem>
                        <MenuItem value="biweekly">Bi-weekly</MenuItem>
                        <MenuItem value="monthly">Monthly</MenuItem>
                        <MenuItem value="quarterly">Quarterly</MenuItem>
                        <MenuItem value="annually">Annually</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                )}

                {paymentMethod === 'bank' && (
                  <>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" gutterBottom style={{ marginTop: '16px' }}>
                        Bank Account Details
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Account Number"
                        variant="outlined"
                        fullWidth
                        placeholder="Enter account number"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Routing Number"
                        variant="outlined"
                        fullWidth
                        placeholder="Enter routing number"
                      />
                    </Grid>
                  </>
                )}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDialogClose} color="primary" variant="contained">
                Complete Payment
              </Button>
            </DialogActions>
          </>
        );
      
      case 'invoice':
        return (
          <>
            <DialogTitle disableTypography className={classes.dialogTitle}>
              <Typography variant="h6">Create Invoice</Typography>
              <IconButton onClick={handleDialogClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Invoice Details
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Invoice Number"
                    variant="outlined"
                    fullWidth
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    required
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Currency</InputLabel>
                    <Select
                      value={invoiceCurrency}
                      onChange={(e) => setInvoiceCurrency(e.target.value)}
                      label="Currency"
                    >
                      <MenuItem value="USD">USD - US Dollar</MenuItem>
                      <MenuItem value="EUR">EUR - Euro</MenuItem>
                      <MenuItem value="GBP">GBP - British Pound</MenuItem>
                      <MenuItem value="JPY">JPY - Japanese Yen</MenuItem>
                      <MenuItem value="CAD">CAD - Canadian Dollar</MenuItem>
                      <MenuItem value="AUD">AUD - Australian Dollar</MenuItem>
                      <MenuItem value="INR">INR - Indian Rupee</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    label="Client Name"
                    variant="outlined"
                    fullWidth
                    value={invoiceClient}
                    onChange={(e) => setInvoiceClient(e.target.value)}
                    required
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    label="Client Email"
                    variant="outlined"
                    fullWidth
                    type="email"
                    placeholder="client@example.com"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    label="Client Address"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={2}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      label="Invoice Date"
                      value={new Date()}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      fullWidth
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      label="Due Date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      fullWidth
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                
                <Grid item xs={12}>
                  <Divider style={{ margin: '16px 0 8px 0' }} />
                  <Typography variant="subtitle1" style={{ marginBottom: '16px' }}>
                    Items
                  </Typography>
                </Grid>
                
                {invoiceItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        value={item.description}
                        onChange={(e) => {
                          const newItems = [...invoiceItems];
                          newItems[index].description = e.target.value;
                          setInvoiceItems(newItems);
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={6} sm={2}>
                      <TextField
                        label="Quantity"
                        variant="outlined"
                        type="number"
                        fullWidth
                        value={item.quantity}
                        onChange={(e) => {
                          const newItems = [...invoiceItems];
                          newItems[index].quantity = e.target.value;
                          setInvoiceItems(newItems);
                        }}
                        InputProps={{ inputProps: { min: 1 } }}
                      />
                    </Grid>
                    
                    <Grid item xs={6} sm={3}>
                      <TextField
                        label="Price"
                        variant="outlined"
                        type="number"
                        fullWidth
                        value={item.price}
                        onChange={(e) => {
                          const newItems = [...invoiceItems];
                          newItems[index].price = e.target.value;
                          setInvoiceItems(newItems);
                        }}
                        InputProps={{
                          startAdornment: <span style={{ marginRight: '8px' }}>{invoiceCurrency === 'USD' ? '$' : invoiceCurrency}</span>,
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={1} style={{ display: 'flex', alignItems: 'center' }}>
                      {index > 0 && (
                        <IconButton 
                          size="small" 
                          onClick={() => {
                            const newItems = [...invoiceItems];
                            newItems.splice(index, 1);
                            setInvoiceItems(newItems);
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                      )}
                    </Grid>
                  </React.Fragment>
                ))}
                
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => {
                      setInvoiceItems([...invoiceItems, { description: '', quantity: 1, price: 0 }]);
                    }}
                    style={{ marginTop: '8px' }}
                  >
                    Add Item
                  </Button>
                </Grid>
                
                <Grid item xs={12}>
                  <Divider style={{ margin: '16px 0' }} />
                </Grid>
                
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Tax Rate (%)"
                    variant="outlined"
                    type="number"
                    fullWidth
                    value={invoiceTaxRate}
                    onChange={(e) => setInvoiceTaxRate(e.target.value)}
                    InputProps={{ inputProps: { min: 0, max: 100 } }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Discount (%)"
                    variant="outlined"
                    type="number"
                    fullWidth
                    value={invoiceDiscount}
                    onChange={(e) => setInvoiceDiscount(e.target.value)}
                    InputProps={{ inputProps: { min: 0, max: 100 } }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={4}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Payment Terms</InputLabel>
                    <Select
                      value={invoicePaymentTerms}
                      onChange={(e) => setInvoicePaymentTerms(e.target.value)}
                      label="Payment Terms"
                    >
                      <MenuItem value="0">Due on Receipt</MenuItem>
                      <MenuItem value="7">Net 7 Days</MenuItem>
                      <MenuItem value="14">Net 14 Days</MenuItem>
                      <MenuItem value="30">Net 30 Days</MenuItem>
                      <MenuItem value="60">Net 60 Days</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                  <Divider style={{ margin: '16px 0 8px 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                    <Typography variant="h6">
                      Total: {invoiceCurrency === 'USD' ? '$' : invoiceCurrency} {calculateInvoiceTotal()}
                    </Typography>
                  </div>
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    label="Notes/Terms"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={2}
                    value={invoiceNotes}
                    onChange={(e) => setInvoiceNotes(e.target.value)}
                    placeholder="Additional notes, payment instructions, or terms and conditions"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Divider style={{ margin: '16px 0 8px 0' }} />
                  <Typography variant="subtitle1" style={{ marginBottom: '8px' }}>
                    Options
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={invoiceBranding}
                        onChange={(e) => setInvoiceBranding(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Include company branding"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Invoice Status</InputLabel>
                    <Select
                      value={invoiceStatus}
                      onChange={(e) => setInvoiceStatus(e.target.value)}
                      label="Invoice Status"
                    >
                      <MenuItem value="draft">Draft</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="sent">Sent</MenuItem>
                      <MenuItem value="paid">Paid</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<AddIcon />}
                    style={{ marginTop: '8px' }}
                  >
                    Attach Document
                  </Button>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                Cancel
              </Button>
              <Button
                color="primary"
                onClick={handleDialogClose}
              >
                Save as Draft
              </Button>
              <Button onClick={handleDialogClose} color="primary" variant="contained">
                Create & Send
              </Button>
            </DialogActions>
          </>
        );
      
      case 'alarm':
        return (
          <>
            <DialogTitle disableTypography className={classes.dialogTitle}>
              <Typography variant="h6">Set Alarm</Typography>
              <IconButton onClick={handleDialogClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Alarm Details
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    value={reminderTitle}
                    onChange={(e) => setReminderTitle(e.target.value)}
                    required
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      label="Date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      fullWidth
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                      margin="normal"
                      label="Alarm Time"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                      fullWidth
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    value={reminderDescription}
                    onChange={(e) => setReminderDescription(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Alarm Sound</InputLabel>
                    <Select
                      value={alarmSound}
                      onChange={(e) => setAlarmSound(e.target.value)}
                      label="Alarm Sound"
                    >
                      <MenuItem value="chime">Chime</MenuItem>
                      <MenuItem value="bell">Bell</MenuItem>
                      <MenuItem value="digital">Digital</MenuItem>
                      <MenuItem value="radar">Radar</MenuItem>
                      <MenuItem value="beacon">Beacon</MenuItem>
                      <MenuItem value="silent">Silent</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Priority</InputLabel>
                    <Select
                      value={alarmPriority}
                      onChange={(e) => setAlarmPriority(e.target.value)}
                      label="Priority"
                    >
                      <MenuItem value="low">Low</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                      <MenuItem value="urgent">Urgent</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Repeat</InputLabel>
                    <Select
                      value={alarmRepeat}
                      onChange={(e) => setAlarmRepeat(e.target.value)}
                      label="Repeat"
                    >
                      <MenuItem value="none">Don't repeat</MenuItem>
                      <MenuItem value="daily">Daily</MenuItem>
                      <MenuItem value="weekdays">Weekdays</MenuItem>
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                      <MenuItem value="yearly">Yearly</MenuItem>
                      <MenuItem value="custom">Custom</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Notification Method</InputLabel>
                    <Select
                      multiple
                      value={alarmNotification}
                      onChange={(e) => setAlarmNotification(e.target.value)}
                      label="Notification Method"
                      renderValue={(selected) => selected.join(', ')}
                    >
                      <MenuItem value="app">In-App</MenuItem>
                      <MenuItem value="email">Email</MenuItem>
                      <MenuItem value="push">Push Notification</MenuItem>
                      <MenuItem value="sms">SMS</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Tags"
                    variant="outlined"
                    fullWidth
                    value={alarmTags}
                    onChange={(e) => setAlarmTags(e.target.value)}
                    placeholder="Enter tags separated by commas (e.g., work, meeting, important)"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        color="primary"
                      />
                    }
                    label="Snooze enabled"
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDialogClose} color="primary" variant="contained">
                Set Alarm
              </Button>
            </DialogActions>
          </>
        );
      
      case 'schedule':
        return (
          <>
            <DialogTitle disableTypography className={classes.dialogTitle}>
              <Typography variant="h6">Schedule Event</Typography>
              <IconButton onClick={handleDialogClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Event Details
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Event Title"
                    variant="outlined"
                    fullWidth
                    value={reminderTitle}
                    onChange={(e) => setReminderTitle(e.target.value)}
                    required
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      label="Date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      fullWidth
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                      margin="normal"
                      label="Time"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                      fullWidth
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    value={reminderDescription}
                    onChange={(e) => setReminderDescription(e.target.value)}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Divider style={{ margin: '16px 0' }}/>
                  <Typography variant="subtitle1" gutterBottom>
                    Calendar Integration
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={calendarSync}
                        onChange={(e) => setCalendarSync(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Sync with Google Calendar"
                  />
                </Grid>
                
                {calendarSync && (
                  <>
                    <Grid item xs={12}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel>Google Calendar Account</InputLabel>
                        <Select
                          value={calendarAccount}
                          onChange={(e) => setCalendarAccount(e.target.value)}
                          label="Google Calendar Account"
                        >
                          <MenuItem value="">
                            <em>Select an account</em>
                          </MenuItem>
                          <MenuItem value="primary">Primary Gmail Account</MenuItem>
                          <MenuItem value="work">Work Account</MenuItem>
                          <MenuItem value="connect">+ Connect a new account</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel>Calendar</InputLabel>
                        <Select
                          label="Calendar"
                          defaultValue="primary"
                        >
                          <MenuItem value="primary">Primary Calendar</MenuItem>
                          <MenuItem value="work">Work</MenuItem>
                          <MenuItem value="personal">Personal</MenuItem>
                          <MenuItem value="family">Family</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel>Visibility</InputLabel>
                        <Select
                          label="Visibility"
                          defaultValue="default"
                        >
                          <MenuItem value="default">Default</MenuItem>
                          <MenuItem value="public">Public</MenuItem>
                          <MenuItem value="private">Private</MenuItem>
                          <MenuItem value="busy">Show as busy</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            color="primary"
                            defaultChecked
                          />
                        }
                        label="Send email notifications to attendees"
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Button
                        variant="text"
                        color="primary"
                        startIcon={<PaymentIcon />}
                        style={{ textTransform: 'none' }}
                      >
                        Manage Google Calendar settings
                      </Button>
                    </Grid>
                  </>
                )}
                
                <Grid item xs={12}>
                  <Divider style={{ margin: '16px 0' }}/>
                  <Typography variant="subtitle1" gutterBottom>
                    Additional Options
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Reminder</InputLabel>
                    <Select
                      label="Reminder"
                      defaultValue="30"
                    >
                      <MenuItem value="0">None</MenuItem>
                      <MenuItem value="5">5 minutes before</MenuItem>
                      <MenuItem value="10">10 minutes before</MenuItem>
                      <MenuItem value="15">15 minutes before</MenuItem>
                      <MenuItem value="30">30 minutes before</MenuItem>
                      <MenuItem value="60">1 hour before</MenuItem>
                      <MenuItem value="120">2 hours before</MenuItem>
                      <MenuItem value="1440">1 day before</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Repeat</InputLabel>
                    <Select
                      value={alarmRepeat}
                      onChange={(e) => setAlarmRepeat(e.target.value)}
                      label="Repeat"
                    >
                      <MenuItem value="none">Don't repeat</MenuItem>
                      <MenuItem value="daily">Daily</MenuItem>
                      <MenuItem value="weekdays">Weekdays</MenuItem>
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                      <MenuItem value="yearly">Yearly</MenuItem>
                      <MenuItem value="custom">Custom</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    label="Location"
                    variant="outlined"
                    fullWidth
                    placeholder="Add location or meeting link"
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDialogClose} color="primary" variant="contained">
                Schedule Event
              </Button>
            </DialogActions>
          </>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleItemClick('automate')} className={classes.menuItem}>
          <ListItemIcon>
            <AutorenewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Automate Mails" />
        </MenuItem>
        <MenuItem onClick={() => handleItemClick('payment')} className={classes.menuItem}>
          <ListItemIcon>
            <PaymentIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Payment" />
        </MenuItem>
        <MenuItem onClick={() => handleItemClick('alarm')} className={classes.menuItem}>
          <ListItemIcon>
            <AlarmIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Alarm" />
        </MenuItem>
        <MenuItem onClick={() => handleItemClick('schedule')} className={classes.menuItem}>
          <ListItemIcon>
            <ScheduleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Schedule" />
        </MenuItem>
      </Menu>
      
      <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
        {renderDialogContent()}
      </Dialog>
    </>
  );
}

export default MoreMenu; 